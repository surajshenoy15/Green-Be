const DEFAULT_MAX_DIMENSION = 1800
const DEFAULT_QUALITY = 0.82
const SKIP_COMPRESSION_BELOW = 450 * 1024

function loadImageElement(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read the selected image.'))
    }

    img.src = url
  })
}

async function getSource(file) {
  if ('createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file)

      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        cleanup: () => bitmap.close?.(),
      }
    } catch {
      // fallback
    }
  }

  const img = await loadImageElement(file)

  return {
    source: img,
    width: img.naturalWidth,
    height: img.naturalHeight,
    cleanup: () => {},
  }
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) resolve(blob)
        else reject(new Error('Image optimisation failed.'))
      },
      type,
      quality
    )
  })
}

function replaceExtension(name, extension) {
  const base = (name || 'image').replace(/\.[^/.]+$/, '')
  return `${base}.${extension}`
}

export async function optimizeImageForUpload(file, options = {}) {
  const maxDimension =
    options.maxDimension || DEFAULT_MAX_DIMENSION

  const quality =
    options.quality ?? DEFAULT_QUALITY

  if (!file?.type?.startsWith('image/')) {
    return file
  }

  if (file.type === 'image/gif') {
    return file
  }

  if (file.size <= SKIP_COMPRESSION_BELOW) {
    return file
  }

  const {
    source,
    width,
    height,
    cleanup,
  } = await getSource(file)

  try {
    const scale = Math.min(
      1,
      maxDimension / Math.max(width, height)
    )

    const targetWidth = Math.max(
      1,
      Math.round(width * scale)
    )

    const targetHeight = Math.max(
      1,
      Math.round(height * scale)
    )

    const canvas = document.createElement('canvas')

    canvas.width = targetWidth
    canvas.height = targetHeight

    const ctx = canvas.getContext('2d')

    if (!ctx) return file

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      source,
      0,
      0,
      targetWidth,
      targetHeight
    )

    let blob

    try {
      blob = await canvasToBlob(
        canvas,
        'image/webp',
        quality
      )
    } catch {
      blob = await canvasToBlob(
        canvas,
        'image/jpeg',
        quality
      )
    }

    if (!blob || blob.size >= file.size) {
      return file
    }

    const extension =
      blob.type === 'image/webp'
        ? 'webp'
        : 'jpg'

    return new File(
      [blob],
      replaceExtension(file.name, extension),
      {
        type: blob.type,
        lastModified: Date.now(),
      }
    )
  } finally {
    cleanup()
  }
}

export function formatFileSize(bytes) {
  if (!bytes) return '0 KB'

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
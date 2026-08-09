import { useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus'

import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { CharacterCount, Placeholder } from '@tiptap/extensions'

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Code2,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Maximize2,
  Minus,
  Palette,
  Pilcrow,
  Plus,
  Quote,
  Redo2,
  Strikethrough,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
} from 'lucide-react'

import { uploadImage } from '../../api/client'

import {
  formatFileSize,
  optimizeImageForUpload,
} from '../../utils/imageOptimization'


function ToolButton({
  active = false,
  disabled = false,
  onClick,
  title,
  children,
}) {
  return (
    <button
      type="button"
      onMouseDown={event => event.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`editor-tool-button ${active ? 'is-active' : ''}`}
    >
      {children}
    </button>
  )
}


function InlineSelect({
  value,
  onChange,
  title,
  children,
}) {
  return (
    <label
      className="editor-select-wrap"
      title={title}
    >
      <select
        value={value}
        onChange={onChange}
        className="editor-select"
      >
        {children}
      </select>

      <ChevronDown size={13} />
    </label>
  )
}


export default function MediumEditor({
  initialJson,
  initialHtml,
  onChange,
  onUploadState,
}) {
  const imageInputRef = useRef(null)

  const [insertOpen, setInsertOpen] =
    useState(false)

  const [uploading, setUploading] =
    useState(false)

  const [uploadStage, setUploadStage] =
    useState('')

  const [
    lastCompression,
    setLastCompression,
  ] = useState(null)


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
        },
      }),

      Image.configure({
        allowBase64: false,

        resize: {
          enabled: true,

          directions: [
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ],

          minWidth: 120,
          minHeight: 80,

          alwaysPreserveAspectRatio: true,
        },
      }),

      TextAlign.configure({
        types: [
          'heading',
          'paragraph',
        ],
      }),

      TextStyleKit,

      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === 'heading'
            ? 'Heading…'
            : 'Tell your story…',
      }),

      CharacterCount,
    ],

    content:
      initialJson &&
      Object.keys(initialJson).length
        ? initialJson
        : initialHtml || '<p></p>',

    editorProps: {
      attributes: {
        class: 'greenbe-prosemirror',
        spellcheck: 'true',
      },
    },

    onUpdate({ editor: current }) {
      onChange?.({
        json: current.getJSON(),
        html: current.getHTML(),

        words:
          current.storage.characterCount.words(),

        characters:
          current.storage.characterCount.characters(),
      })
    },
  })


  if (!editor) {
    return null
  }


  const setLink = () => {
    const previous =
      editor.getAttributes('link').href || ''

    const url = window.prompt(
      'Link URL',
      previous || 'https://'
    )

    if (url === null) {
      return
    }

    if (!url.trim()) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()

      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: url.trim(),
      })
      .run()
  }


  const handleImage = async event => {
    const file =
      event.target.files?.[0]

    event.target.value = ''

    if (!file) {
      return
    }

    setUploading(true)
    setUploadStage('Optimising…')
    setLastCompression(null)

    onUploadState?.(true)

    try {
      /*
       * STEP 1
       * Compress / resize the image locally
       * before sending it to the backend.
       */
      const optimisedFile =
        await optimizeImageForUpload(
          file,
          {
            maxDimension: 1800,
            quality: 0.82,
          }
        )


      if (
        optimisedFile.size <
        file.size
      ) {
        setLastCompression({
          before: file.size,
          after: optimisedFile.size,
        })
      }


      /*
       * STEP 2
       * Upload the smaller file.
       */
      setUploadStage('Uploading…')

      const result =
        await uploadImage(
          optimisedFile
        )


      /*
       * STEP 3
       * Insert the uploaded image
       * inside Tiptap.
       */
      editor
        .chain()
        .focus()
        .setImage({
          src: result.url,
          alt: file.name,
        })
        .run()


      setInsertOpen(false)

    } catch (error) {
      console.error(
        'Image upload failed:',
        error
      )

      window.alert(
        error.message ||
          'Image upload failed'
      )

    } finally {
      setUploading(false)
      setUploadStage('')

      onUploadState?.(false)
    }
  }


  const openImagePicker = () => {
    imageInputRef.current?.click()
  }


  return (
    <div className="medium-editor-shell">

      {/* Hidden image picker */}

      <input
        ref={imageInputRef}
        type="file"
        accept="
          image/png,
          image/jpeg,
          image/webp,
          image/gif
        "
        className="hidden"
        onChange={handleImage}
      />


      {/* Main editor toolbar */}

      <div
        className="editor-toolbar"
        aria-label="Editor toolbar"
      >

        {/* Undo / redo */}

        <div className="editor-toolbar-group">

          <ToolButton
            title="Undo"
            onClick={() =>
              editor
                .chain()
                .focus()
                .undo()
                .run()
            }
            disabled={
              !editor.can().undo()
            }
          >
            <Undo2 size={17} />
          </ToolButton>


          <ToolButton
            title="Redo"
            onClick={() =>
              editor
                .chain()
                .focus()
                .redo()
                .run()
            }
            disabled={
              !editor.can().redo()
            }
          >
            <Redo2 size={17} />
          </ToolButton>

        </div>


        <div className="editor-toolbar-separator" />


        {/* Paragraph / heading */}

        <div className="editor-toolbar-group">

          <ToolButton
            title="Paragraph"
            active={
              editor.isActive(
                'paragraph'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .setParagraph()
                .run()
            }
          >
            <Pilcrow size={17} />
          </ToolButton>


          <ToolButton
            title="Heading 2"
            active={
              editor.isActive(
                'heading',
                {
                  level: 2,
                }
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 2,
                })
                .run()
            }
          >
            <Heading2 size={17} />
          </ToolButton>


          <ToolButton
            title="Heading 3"
            active={
              editor.isActive(
                'heading',
                {
                  level: 3,
                }
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 3,
                })
                .run()
            }
          >
            <Heading3 size={17} />
          </ToolButton>


          <ToolButton
            title="Block quote"
            active={
              editor.isActive(
                'blockquote'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
          >
            <Quote size={17} />
          </ToolButton>

        </div>


        <div className="editor-toolbar-separator" />


        {/* Text formatting */}

        <div className="editor-toolbar-group">

          <ToolButton
            title="Bold"
            active={
              editor.isActive('bold')
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
          >
            <Bold size={17} />
          </ToolButton>


          <ToolButton
            title="Italic"
            active={
              editor.isActive(
                'italic'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
          >
            <Italic size={17} />
          </ToolButton>


          <ToolButton
            title="Underline"
            active={
              editor.isActive(
                'underline'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
          >
            <UnderlineIcon
              size={17}
            />
          </ToolButton>


          <ToolButton
            title="Strike"
            active={
              editor.isActive(
                'strike'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
          >
            <Strikethrough
              size={17}
            />
          </ToolButton>


          <ToolButton
            title="Link"
            active={
              editor.isActive('link')
            }
            onClick={setLink}
          >
            <Link2 size={17} />
          </ToolButton>

        </div>


        <div className="editor-toolbar-separator" />


        {/* Lists */}

        <div className="editor-toolbar-group">

          <ToolButton
            title="Bullet list"
            active={
              editor.isActive(
                'bulletList'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
          >
            <List size={17} />
          </ToolButton>


          <ToolButton
            title="Numbered list"
            active={
              editor.isActive(
                'orderedList'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
          >
            <ListOrdered size={17} />
          </ToolButton>


          <ToolButton
            title="Code block"
            active={
              editor.isActive(
                'codeBlock'
              )
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleCodeBlock()
                .run()
            }
          >
            <Code2 size={17} />
          </ToolButton>

        </div>


        <div className="editor-toolbar-separator" />


        {/* Alignment */}

        <div className="editor-toolbar-group">

          <ToolButton
            title="Align left"
            active={
              editor.isActive({
                textAlign: 'left',
              })
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .setTextAlign(
                  'left'
                )
                .run()
            }
          >
            <AlignLeft size={17} />
          </ToolButton>


          <ToolButton
            title="Align center"
            active={
              editor.isActive({
                textAlign:
                  'center',
              })
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .setTextAlign(
                  'center'
                )
                .run()
            }
          >
            <AlignCenter
              size={17}
            />
          </ToolButton>


          <ToolButton
            title="Align right"
            active={
              editor.isActive({
                textAlign: 'right',
              })
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .setTextAlign(
                  'right'
                )
                .run()
            }
          >
            <AlignRight size={17} />
          </ToolButton>


          <ToolButton
            title="Justify"
            active={
              editor.isActive({
                textAlign:
                  'justify',
              })
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .setTextAlign(
                  'justify'
                )
                .run()
            }
          >
            <AlignJustify
              size={17}
            />
          </ToolButton>

        </div>


        <div className="editor-toolbar-separator" />


        {/* Font controls */}

        <div
          className="
            editor-toolbar-group
            editor-toolbar-responsive-options
          "
        >

          <InlineSelect
            title="Font family"
            value={
              editor.getAttributes(
                'textStyle'
              ).fontFamily || ''
            }
            onChange={event =>
              event.target.value

                ? editor
                    .chain()
                    .focus()
                    .setFontFamily(
                      event.target
                        .value
                    )
                    .run()

                : editor
                    .chain()
                    .focus()
                    .unsetFontFamily()
                    .run()
            }
          >
            <option value="">
              Default font
            </option>

            <option value="Georgia">
              Georgia
            </option>

            <option value="DM Sans">
              DM Sans
            </option>

            <option value="Manrope">
              Manrope
            </option>

            <option value="Arial">
              Arial
            </option>
          </InlineSelect>


          <InlineSelect
            title="Font size"
            value={
              editor.getAttributes(
                'textStyle'
              ).fontSize || ''
            }
            onChange={event =>
              event.target.value

                ? editor
                    .chain()
                    .focus()
                    .setFontSize(
                      event.target
                        .value
                    )
                    .run()

                : editor
                    .chain()
                    .focus()
                    .unsetFontSize()
                    .run()
            }
          >
            <option value="">
              Size
            </option>

            <option value="14px">
              14
            </option>

            <option value="16px">
              16
            </option>

            <option value="18px">
              18
            </option>

            <option value="20px">
              20
            </option>

            <option value="24px">
              24
            </option>

            <option value="30px">
              30
            </option>
          </InlineSelect>


          <label
            className="
              editor-color-control
            "
            title="Text color"
          >
            <Palette size={15} />

            <input
              type="color"
              value={
                editor.getAttributes(
                  'textStyle'
                ).color ||
                '#143d29'
              }
              onChange={event =>
                editor
                  .chain()
                  .focus()
                  .setColor(
                    event.target
                      .value
                  )
                  .run()
              }
            />
          </label>

        </div>

      </div>


      {/* Text selection menu */}

      {editor && (
        <BubbleMenu
          editor={editor}
          options={{
            placement: 'top',
          }}
          shouldShow={({
            editor: current,
            state,
          }) =>
            !current.isActive(
              'image'
            ) &&
            !state.selection.empty
          }
        >
          <div className="editor-bubble-menu">

            <ToolButton
              title="Bold"
              active={
                editor.isActive(
                  'bold'
                )
              }
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleBold()
                  .run()
              }
            >
              <Bold size={16} />
            </ToolButton>


            <ToolButton
              title="Italic"
              active={
                editor.isActive(
                  'italic'
                )
              }
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleItalic()
                  .run()
              }
            >
              <Italic size={16} />
            </ToolButton>


            <ToolButton
              title="Link"
              active={
                editor.isActive(
                  'link'
                )
              }
              onClick={setLink}
            >
              <Link2 size={16} />
            </ToolButton>


            <span className="h-5 w-px bg-white/20" />


            <ToolButton
              title="Heading 2"
              active={
                editor.isActive(
                  'heading',
                  {
                    level: 2,
                  }
                )
              }
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({
                    level: 2,
                  })
                  .run()
              }
            >
              <Heading2 size={16} />
            </ToolButton>


            <ToolButton
              title="Quote"
              active={
                editor.isActive(
                  'blockquote'
                )
              }
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleBlockquote()
                  .run()
              }
            >
              <Quote size={16} />
            </ToolButton>

          </div>
        </BubbleMenu>
      )}


      {/* Image selection menu */}

      {editor && (
        <BubbleMenu
          editor={editor}
          options={{
            placement: 'bottom',
          }}
          shouldShow={({
            editor: current,
          }) =>
            current.isActive(
              'image'
            )
          }
        >
          <div className="editor-image-bubble-menu">

            <span className="editor-image-resize-hint">
              <Maximize2
                size={15}
              />

              Drag corners to resize
            </span>


            <span className="editor-image-menu-divider" />


            <button
              type="button"
              className="
                editor-image-delete-button
              "
              title="Remove image"
              onMouseDown={event =>
                event.preventDefault()
              }
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .deleteSelection()
                  .run()
              }
            >
              <Trash2
                size={15}
              />

              Remove
            </button>

          </div>
        </BubbleMenu>
      )}


      {/* Medium-like + insertion menu */}

      {editor && (
        <FloatingMenu
          editor={editor}
          options={{
            placement:
              'left-start',
          }}
          shouldShow={({
            state,
          }) => {
            const {
              $from,
            } = state.selection

            return (
              $from.parent.type
                .name ===
                'paragraph' &&
              $from.parent.content
                .size === 0
            )
          }}
        >
          <div className="editor-floating-wrap">

            <button
              type="button"
              onClick={() =>
                setInsertOpen(
                  value => !value
                )
              }
              className={`
                editor-plus-button
                ${
                  insertOpen
                    ? 'is-open'
                    : ''
                }
              `}
              title="Insert"
            >
              <Plus size={18} />
            </button>


            {insertOpen && (
              <div className="editor-insert-menu">

                {/* Image */}

                <button
                  type="button"
                  onClick={
                    openImagePicker
                  }
                  disabled={
                    uploading
                  }
                >
                  <ImagePlus
                    size={17}
                  />

                  <span>
                    {uploading
                      ? uploadStage ||
                        'Uploading…'
                      : 'Image'}
                  </span>
                </button>


                {/* Divider */}

                <button
                  type="button"
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .setHorizontalRule()
                      .run()

                    setInsertOpen(
                      false
                    )
                  }}
                >
                  <Minus
                    size={17}
                  />

                  <span>
                    Divider
                  </span>
                </button>


                {/* Quote */}

                <button
                  type="button"
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleBlockquote()
                      .run()

                    setInsertOpen(
                      false
                    )
                  }}
                >
                  <Quote
                    size={17}
                  />

                  <span>
                    Quote
                  </span>
                </button>

              </div>
            )}

          </div>
        </FloatingMenu>
      )}


      {/* Main article writing area */}

      <EditorContent
        editor={editor}
      />


      {/* Image optimisation result */}

      {lastCompression &&
        !uploading && (
          <div className="editor-upload-result">

            Optimised{' '}

            {formatFileSize(
              lastCompression.before
            )}

            {' → '}

            {formatFileSize(
              lastCompression.after
            )}

          </div>
        )}


      {/* Word / character count */}

      <div className="editor-counts">

        <span>
          {
            editor.storage
              .characterCount
              .words()
          }{' '}
          words
        </span>

        <span>
          {
            editor.storage
              .characterCount
              .characters()
          }{' '}
          characters
        </span>

      </div>

    </div>
  )
}
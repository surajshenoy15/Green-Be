export const factCategories = [
  'All',
  'Energy',
  'Travel',
  'Food',
  'Waste',
  'Water',
  'Nature',
  'Lifestyle',
]

export const facts = [
  {
    id: 1,
    category: 'Energy',
    icon: 'Lightbulb',
    value: '75% less',
    title: 'LED bulbs need far less electricity',
    summary:
      'LED lighting uses at least 75% less energy than traditional incandescent lighting.',
    detail:
      'LEDs also last much longer, so one small switch can reduce both electricity use and the number of bulbs that must be manufactured and discarded.',
    action:
      'Replace the bulbs used for the most hours each day first.',
    source: 'U.S. Department of Energy',
    sourceUrl: 'https://www.energy.gov/energysaver/led-lighting',
  },
  {
    id: 2,
    category: 'Energy',
    icon: 'WashingMachine',
    value: 'About 90%',
    title: 'Most washing energy heats the water',
    summary:
      'Water heating can account for about 90% of the energy used by a clothes washer.',
    detail:
      'The motor itself uses only a small share. For suitable loads, changing from hot to cold water can sharply reduce the energy needed for every wash.',
    action: 'Choose a cold-water cycle for everyday clothes.',
    source: 'ENERGY STAR',
    sourceUrl: 'https://www.energystar.gov/products/clothes_washers',
  },
  {
    id: 3,
    category: 'Energy',
    icon: 'PlugZap',
    value: '5–10%',
    title: 'Standby power quietly adds up',
    summary:
      'Devices can continue drawing electricity even when they appear to be switched off.',
    detail:
      'Across a home, chargers, televisions, game consoles and other electronics in standby mode can create a noticeable background electricity load.',
    action:
      'Switch off power strips for devices you are not using.',
    source: 'Lawrence Berkeley National Laboratory',
    sourceUrl: 'https://standby.lbl.gov/',
  },
  {
    id: 4,
    category: 'Energy',
    icon: 'ThermometerSun',
    value: 'Around 7%',
    title: 'A one-degree thermostat change matters',
    summary:
      'Lowering heating by 1°C can reduce the energy used for heating by around 7%.',
    detail:
      'A small temperature adjustment may feel minor, but repeated over an entire season it can reduce fuel or electricity consumption considerably.',
    action: 'Use the lowest comfortable heating setting.',
    source: 'International Energy Agency',
    sourceUrl: 'https://www.iea.org/reports/playing-my-part',
  },
  {
    id: 5,
    category: 'Energy',
    icon: 'Wind',
    value: '5–15%',
    title: 'A dirty AC filter wastes energy',
    summary:
      'Replacing a dirty filter can lower an air conditioner’s energy consumption.',
    detail:
      'Restricted airflow forces the system to work harder. Regular cleaning or replacement also helps cooling equipment perform more consistently.',
    action: 'Check your AC filter monthly during heavy use.',
    source: 'U.S. Department of Energy',
    sourceUrl:
      'https://www.energy.gov/energysaver/maintaining-your-air-conditioner',
  },
  {
    id: 6,
    category: 'Energy',
    icon: 'Fan',
    value: 'Up to 4°F',
    title: 'A ceiling fan can reduce AC demand',
    summary:
      'A ceiling fan can let you raise the thermostat by about 4°F without reducing comfort.',
    detail:
      'Fans cool people through air movement rather than cooling the entire room, making them useful alongside efficient air-conditioning settings.',
    action:
      'Use fans in occupied rooms and switch them off when leaving.',
    source: 'U.S. Department of Energy',
    sourceUrl: 'https://www.energy.gov/energysaver/fans-cooling',
  },
  {
    id: 7,
    category: 'Energy',
    icon: 'Flame',
    value: 'Moves heat',
    title: 'Heat pumps do not create heat in the usual way',
    summary:
      'Heat pumps transfer heat, allowing them to deliver more heat energy than the electricity they consume.',
    detail:
      'Instead of burning fuel or using resistance heating, a heat pump moves existing heat between indoors and outdoors, which can make it highly efficient.',
    action:
      'Consider efficiency ratings when replacing cooling or heating equipment.',
    source: 'International Energy Agency',
    sourceUrl:
      'https://www.iea.org/reports/the-future-of-heat-pumps',
  },
  {
    id: 8,
    category: 'Energy',
    icon: 'Sun',
    value: 'Zero drying power',
    title: 'Sunlight can replace an electric dryer',
    summary:
      'Line-drying clothes avoids the electricity that a tumble dryer would use.',
    detail:
      'Dryers are high-power appliances. Air-drying also reduces heat exposure and may help some clothes last longer.',
    action: 'Air-dry one or two laundry loads each week.',
    source: 'United Nations ActNow',
    sourceUrl: 'https://www.un.org/en/actnow/home-energy',
  },

  {
    id: 9,
    category: 'Travel',
    icon: 'CarFront',
    value: 'About 10%',
    title: 'Cars and vans have a major global footprint',
    summary:
      'Private cars and vans were responsible for around 10% of energy-related CO₂ emissions in 2023.',
    detail:
      'Their impact comes not only from fuel use, but also from vehicle production, roads, parking infrastructure and congestion.',
    action: 'Combine nearby errands into one trip.',
    source: 'International Energy Agency',
    sourceUrl:
      'https://www.iea.org/reports/energy-efficiency-policy-toolkit-2024/transport',
  },
  {
    id: 10,
    category: 'Travel',
    icon: 'Route',
    value: 'Nearly 90%',
    title: 'Road travel dominates transport energy use',
    summary:
      'Road transport accounts for nearly 90% of domestic transport energy demand globally.',
    detail:
      'Cars, vans, buses and trucks therefore offer a large opportunity for efficiency, electrification, shared mobility and shorter journeys.',
    action:
      'Choose the least fuel-intensive option available for each trip.',
    source: 'International Energy Agency',
    sourceUrl:
      'https://www.iea.org/reports/energy-efficiency-2025/transport',
  },
  {
    id: 11,
    category: 'Travel',
    icon: 'Users',
    value: 'Over 60%',
    title: 'Passenger cars create most road emissions',
    summary:
      'Passenger cars and vans account for over 60% of global road-sector emissions.',
    detail:
      'This makes everyday commuting decisions important. More passengers in one vehicle can lower emissions per person for the same journey.',
    action:
      'Carpool for a regular college or office commute.',
    source: 'International Energy Agency',
    sourceUrl:
      'https://www.iea.org/reports/breakthrough-agenda-report-2025/road-transport',
  },
  {
    id: 12,
    category: 'Travel',
    icon: 'Gauge',
    value: 'Up to 3%',
    title: 'Correct tyre pressure saves fuel',
    summary:
      'Properly inflated tyres can improve a vehicle’s fuel economy by up to about 3%.',
    detail:
      'Under-inflated tyres increase rolling resistance, making the engine work harder while also contributing to uneven tyre wear.',
    action:
      'Check tyre pressure before long journeys and once a month.',
    source: 'U.S. Department of Energy',
    sourceUrl: 'https://www.fueleconomy.gov/feg/maintain.jsp',
  },
  {
    id: 13,
    category: 'Travel',
    icon: 'Rabbit',
    value: 'Smoother is better',
    title: 'Aggressive driving burns extra fuel',
    summary:
      'Rapid acceleration, hard braking and speeding reduce fuel economy.',
    detail:
      'Anticipating traffic and maintaining a steady speed can cut unnecessary fuel use while also reducing wear on brakes and tyres.',
    action:
      'Accelerate gradually and leave enough distance to avoid sudden braking.',
    source: 'U.S. Department of Energy',
    sourceUrl: 'https://www.fueleconomy.gov/feg/driveHabits.jsp',
  },
  {
    id: 14,
    category: 'Travel',
    icon: 'CircleStop',
    value: '0 km travelled',
    title: 'Idling uses fuel without moving you',
    summary:
      'An idling engine consumes fuel while the vehicle covers no distance.',
    detail:
      'Long waits with the engine running add emissions, noise and fuel cost without helping you reach the destination sooner.',
    action:
      'Switch off during longer, safe and legal waiting periods.',
    source: 'U.S. Department of Energy',
    sourceUrl: 'https://www.energy.gov/energysaver/idle-reduction',
  },
  {
    id: 15,
    category: 'Travel',
    icon: 'TrainFront',
    value: 'Efficient mobility',
    title: 'Rail can move people with less energy',
    summary:
      'Rail transport can reduce energy use and emissions compared with more energy-intensive travel modes.',
    detail:
      'The advantage is often strongest on busy routes where trains carry many passengers and replace large numbers of individual vehicle journeys.',
    action:
      'Compare train options before booking a flight or long car journey.',
    source: 'International Energy Agency',
    sourceUrl: 'https://www.iea.org/reports/the-future-of-rail',
  },
  {
    id: 16,
    category: 'Travel',
    icon: 'Bike',
    value: 'Zero tailpipe',
    title: 'Walking and cycling create no exhaust emissions',
    summary:
      'Human-powered trips produce no tailpipe emissions during the journey.',
    detail:
      'Replacing short motor trips also reduces congestion and can improve health, especially where routes are safe and practical.',
    action:
      'Replace one short trip this week with walking or cycling.',
    source: 'United Nations ActNow',
    sourceUrl: 'https://www.un.org/en/actnow/transport',
  },

  {
    id: 17,
    category: 'Food',
    icon: 'Trash2',
    value: '8–10%',
    title: 'Food waste has a global climate cost',
    summary:
      'Food loss and waste are linked to roughly 8–10% of global greenhouse-gas emissions.',
    detail:
      'When food is wasted, the land, water, fertiliser, refrigeration, labour and transport used to produce it are also wasted.',
    action:
      'Plan meals around food that needs to be used first.',
    source: 'UN Environment Programme',
    sourceUrl:
      'https://www.unep.org/resources/report/unep-food-waste-index-report-2024',
  },
  {
    id: 18,
    category: 'Food',
    icon: 'Apple',
    value: 'About one-third',
    title: 'A huge share of food is never eaten',
    summary:
      'Roughly one-third of food produced for people is lost or wasted globally.',
    detail:
      'Loss can happen on farms and during storage, while waste also happens in shops, restaurants and homes.',
    action:
      'Buy smaller quantities more often when food spoils quickly.',
    source: 'Food and Agriculture Organization',
    sourceUrl:
      'https://www.fao.org/platforms/green-agriculture/areas-of-work/consumption-food-loss-and-waste/en',
  },
  {
    id: 19,
    category: 'Food',
    icon: 'LeafyGreen',
    value: 'Lower impact',
    title: 'Plant-rich meals can reduce food emissions',
    summary:
      'Diets higher in plant foods generally use less land and create fewer emissions than meat-heavy diets.',
    detail:
      'Beans, lentils, vegetables, grains, nuts and seeds can make meals varied and filling while reducing reliance on high-impact ingredients.',
    action:
      'Choose one plant-based lunch or dinner each week.',
    source: 'United Nations ActNow',
    sourceUrl: 'https://www.un.org/en/actnow/food',
  },
  {
    id: 20,
    category: 'Food',
    icon: 'Beef',
    value: 'Protein matters',
    title: 'Not all proteins have the same footprint',
    summary:
      'Beef and lamb usually create far more emissions per kilogram than beans, peas or lentils.',
    detail:
      'Animal digestion, feed production and land use make ruminant meat particularly carbon intensive compared with many plant proteins.',
    action: 'Swap part of a meat dish with beans or lentils.',
    source: 'Our World in Data',
    sourceUrl:
      'https://ourworldindata.org/food-choice-vs-eating-local',
  },
  {
    id: 21,
    category: 'Food',
    icon: 'MapPin',
    value: 'Production first',
    title: 'What you eat often matters more than distance',
    summary:
      'For many foods, production creates a larger share of emissions than transport.',
    detail:
      'Buying local can have benefits, but choosing a lower-impact food may reduce emissions more than buying a high-impact food produced nearby.',
    action:
      'Consider both the food type and where it comes from.',
    source: 'Our World in Data',
    sourceUrl:
      'https://ourworldindata.org/food-choice-vs-eating-local',
  },
  {
    id: 22,
    category: 'Food',
    icon: 'Sprout',
    value: 'Nutrients returned',
    title: 'Composting turns scraps into a soil resource',
    summary:
      'Composting food and garden waste returns nutrients and organic matter to soil.',
    detail:
      'Keeping organic material out of landfill can also reduce methane associated with anaerobic decomposition.',
    action:
      'Start with fruit peels, vegetable scraps and dry leaves.',
    source: 'U.S. Environmental Protection Agency',
    sourceUrl:
      'https://www.epa.gov/sustainable-management-food/composting',
  },
  {
    id: 23,
    category: 'Food',
    icon: 'Snowflake',
    value: 'Pause spoilage',
    title: 'A freezer can be a food-waste tool',
    summary:
      'Freezing suitable food before it spoils extends the time available to use it.',
    detail:
      'Bread, cooked rice, ripe fruit, herbs and many leftovers can be frozen in useful portions and labelled with a date.',
    action:
      'Create an “eat first” box in the fridge and freeze extras.',
    source: 'UN Environment Programme',
    sourceUrl:
      'https://www.unep.org/thinkeatsave/get-informed/reduce-food-waste',
  },
  {
    id: 24,
    category: 'Food',
    icon: 'GlassWater',
    value: 'Less packaging',
    title: 'Refilling water avoids single-use bottles',
    summary:
      'Safe tap or filtered water can avoid the packaging and transport linked to bottled water.',
    detail:
      'A reusable bottle creates an upfront footprint, but repeated use spreads that impact over many drinks.',
    action:
      'Carry a refillable bottle when safe drinking water is available.',
    source: 'United Nations ActNow',
    sourceUrl: 'https://www.un.org/en/actnow/ten-actions',
  },

  {
    id: 25,
    category: 'Waste',
    icon: 'Recycle',
    value: 'About 95%',
    title: 'Recycled aluminium saves enormous energy',
    summary:
      'Making aluminium from recycled material can use about 95% less energy than making it from ore.',
    detail:
      'Aluminium can be recycled repeatedly, making correct collection especially valuable for cans, trays and other clean aluminium items.',
    action:
      'Rinse aluminium packaging and place it in the correct recycling stream.',
    source: 'U.S. Environmental Protection Agency',
    sourceUrl:
      'https://archive.epa.gov/epawaste/conserve/smm/wastewise/web/html/factoid.html',
  },
  {
    id: 26,
    category: 'Waste',
    icon: 'Package',
    value: '25+ laptop hours',
    title: 'Ten recycled bottles can save useful energy',
    summary:
      'Recycling ten plastic bottles can save enough energy to power a laptop for more than 25 hours.',
    detail:
      'The exact benefit varies by material and system, but recycling generally reduces the need to extract and process virgin resources.',
    action:
      'Empty, clean and sort bottles according to local rules.',
    source: 'U.S. Environmental Protection Agency',
    sourceUrl:
      'https://www.epa.gov/recycle/recycling-basics-and-benefits',
  },
  {
    id: 27,
    category: 'Waste',
    icon: 'FileText',
    value: '322 gallons',
    title: 'Recycling office paper saves energy',
    summary:
      'Recycling one ton of office paper can save energy equal to roughly 322 gallons of petrol.',
    detail:
      'Using both sides of paper and reducing unnecessary printing prevents waste before recycling is even needed.',
    action: 'Make double-sided printing your default.',
    source: 'U.S. Environmental Protection Agency',
    sourceUrl:
      'https://www.epa.gov/recycle/frequent-questions-recycling',
  },
  {
    id: 28,
    category: 'Waste',
    icon: 'Wine',
    value: 'Again and again',
    title: 'Glass can be recycled repeatedly',
    summary:
      'Glass can be remelted into new glass without losing its basic material quality.',
    detail:
      'Successful recycling still depends on colour separation, collection systems and keeping ceramics or other contaminants out.',
    action:
      'Follow local rules for sorting glass by colour or type.',
    source: 'European Container Glass Federation',
    sourceUrl: 'https://feve.org/glass-recycling/',
  },
  {
    id: 29,
    category: 'Waste',
    icon: 'Laptop',
    value: 'Fast-growing waste',
    title: 'E-waste is increasing rapidly',
    summary:
      'Discarded electronics are among the world’s fastest-growing waste streams.',
    detail:
      'Phones, computers and appliances contain valuable materials but may also contain substances requiring specialised handling.',
    action:
      'Use an authorised e-waste collection centre instead of mixed waste.',
    source: 'Global E-waste Monitor',
    sourceUrl: 'https://ewastemonitor.info/',
  },
  {
    id: 30,
    category: 'Waste',
    icon: 'Shirt',
    value: '2–8%',
    title: 'Fashion has a significant climate footprint',
    summary:
      'The textile industry is estimated to contribute around 2–8% of global greenhouse-gas emissions.',
    detail:
      'Fibres, dyeing, manufacturing, transport, washing and disposal all contribute across the life of a garment.',
    action: 'Buy fewer pieces and wear each item for longer.',
    source: 'UN Environment Programme',
    sourceUrl:
      'https://www.unep.org/news-and-stories/story/environmental-costs-fast-fashion',
  },
  {
    id: 31,
    category: 'Waste',
    icon: 'Wrench',
    value: 'Life extended',
    title: 'Repair delays the footprint of replacement',
    summary:
      'Keeping a product working longer delays the materials and energy needed to manufacture a new one.',
    detail:
      'Repair is especially valuable for products with carbon-intensive manufacturing, including electronics, furniture and appliances.',
    action:
      'Check repair cost and spare-part availability before replacing an item.',
    source: 'United Nations ActNow',
    sourceUrl: 'https://www.un.org/en/actnow/ten-actions',
  },
  {
    id: 32,
    category: 'Waste',
    icon: 'CircleAlert',
    value: 'Sort correctly',
    title: 'Recycling contamination reduces recovery',
    summary:
      'Food, liquids and non-recyclable objects can contaminate otherwise useful recyclable material.',
    detail:
      'Local collection systems accept different items, so “wish-cycling” an uncertain product can sometimes cause more problems than it solves.',
    action:
      'Check local recycling guidance instead of guessing.',
    source: 'U.S. Environmental Protection Agency',
    sourceUrl:
      'https://www.epa.gov/recycle/frequent-questions-recycling',
  },

  {
    id: 33,
    category: 'Water',
    icon: 'ShowerHead',
    value: 'Two savings',
    title: 'Shorter showers save water and energy',
    summary:
      'Using less hot water reduces both water demand and the energy required to heat it.',
    detail:
      'A shorter shower therefore addresses two resource uses at once, particularly where water heating relies on fossil fuels or grid electricity.',
    action: 'Reduce your usual shower by two minutes.',
    source: 'United Nations',
    sourceUrl:
      'https://www.un.org/sustainabledevelopment/climate-action-superheroes-info/',
  },
  {
    id: 34,
    category: 'Water',
    icon: 'Droplets',
    value: 'Nearly 10,000 gal',
    title: 'Household leaks can waste huge amounts',
    summary:
      'An average U.S. home’s leaks can waste nearly 10,000 gallons of water each year.',
    detail:
      'The exact amount differs by home, but dripping taps, leaking toilet valves and damaged pipes can waste water continuously.',
    action:
      'Check the water meter before and after a no-use period.',
    source: 'EPA WaterSense',
    sourceUrl: 'https://www.epa.gov/watersense/fix-leak-week',
  },
  {
    id: 35,
    category: 'Water',
    icon: 'Utensils',
    value: 'Full loads',
    title: 'Half-empty washing cycles waste capacity',
    summary:
      'Dishwashers and washing machines generally use their capacity best when run with full, suitable loads.',
    detail:
      'Running fewer cycles can save water and energy, as long as the machine is not overloaded and cleaning performance remains effective.',
    action:
      'Wait for a full load before starting the machine.',
    source: 'ENERGY STAR',
    sourceUrl: 'https://www.energystar.gov/products/dishwashers',
  },
  {
    id: 36,
    category: 'Water',
    icon: 'BadgeMinus',
    value: 'Flow reduced',
    title: 'Aerators reduce tap water use',
    summary:
      'Efficient tap aerators mix air into the stream to reduce water flow while maintaining useful pressure.',
    detail:
      'They are small, inexpensive fittings that can reduce both water demand and hot-water energy use at frequently used taps.',
    action:
      'Install aerators on kitchen and bathroom taps.',
    source: 'EPA WaterSense',
    sourceUrl:
      'https://www.epa.gov/watersense/bathroom-faucets',
  },
  {
    id: 37,
    category: 'Water',
    icon: 'Brush',
    value: 'Tap off',
    title: 'Brushing does not require running water',
    summary:
      'Turning off the tap while brushing prevents clean water from flowing unused.',
    detail:
      'Small routines happen every day, so a few avoided minutes of flow can add up across a household over a year.',
    action:
      'Wet the brush, close the tap and reopen it only to rinse.',
    source: 'United Nations',
    sourceUrl:
      'https://www.un.org/sustainabledevelopment/climate-action-superheroes-info/',
  },
  {
    id: 38,
    category: 'Water',
    icon: 'CloudRain',
    value: 'Reuse rainfall',
    title: 'Rainwater can replace treated water for some tasks',
    summary:
      'Collected rainwater can be used for suitable non-drinking purposes such as garden irrigation.',
    detail:
      'Local rules, roof materials, storage hygiene and mosquito protection must be considered when installing a collection system.',
    action:
      'Use a covered rain barrel where regulations and conditions allow.',
    source: 'United Nations Water',
    sourceUrl:
      'https://www.un.org/en/climatechange/science/climate-issues/water',
  },

  {
    id: 39,
    category: 'Nature',
    icon: 'Waves',
    value: 'Only 3–4%',
    title: 'Peatlands hold extraordinary carbon stores',
    summary:
      'Peatlands cover only around 3–4% of land but contain up to one-third of the world’s soil carbon.',
    detail:
      'When peatlands are drained or burned, stored carbon can be released. Keeping them wet protects both climate and biodiversity.',
    action:
      'Support products and policies that avoid peatland destruction.',
    source: 'UN Environment Programme',
    sourceUrl:
      'https://www.unep.org/resources/global-peatlands-assessment-2022',
  },
  {
    id: 40,
    category: 'Nature',
    icon: 'Trees',
    value: 'Blue carbon',
    title: 'Mangroves store carbon in deep coastal soils',
    summary:
      'Mangrove ecosystems can store several times more carbon per area than many terrestrial forests.',
    detail:
      'They also protect coastlines, provide fish habitat and reduce wave energy, creating benefits beyond carbon storage.',
    action:
      'Support verified mangrove protection and restoration projects.',
    source: 'UNESCO',
    sourceUrl:
      'https://www.unesco.org/en/articles/mangroves-are-allies-against-climate-change',
  },
  {
    id: 41,
    category: 'Nature',
    icon: 'TreePine',
    value: 'Carbon + shade',
    title: 'Urban trees help in more than one way',
    summary:
      'Trees store carbon while their shade and evapotranspiration can reduce local heat.',
    detail:
      'Correct species selection and long-term care matter because a healthy, mature tree provides more benefits than a poorly placed sapling.',
    action:
      'Plant native trees only where they can be cared for long term.',
    source: 'UN Environment Programme',
    sourceUrl:
      'https://www.unep.org/news-and-stories/story/cities-and-climate-change',
  },
  {
    id: 42,
    category: 'Nature',
    icon: 'LandPlot',
    value: 'Hidden carbon',
    title: 'Soil is a major carbon reservoir',
    summary:
      'Healthy soils hold enormous quantities of carbon and support climate-resilient food systems.',
    detail:
      'Erosion, excessive disturbance and loss of organic matter can reduce soil health, while cover crops and compost can help rebuild it.',
    action:
      'Keep garden soil covered with plants or organic mulch.',
    source: 'Food and Agriculture Organization',
    sourceUrl:
      'https://www.fao.org/climate-change/fao-at-cop-28/key-messages/en',
  },
  {
    id: 43,
    category: 'Nature',
    icon: 'Shell',
    value: 'Tiny area, big role',
    title: 'Seagrass meadows are powerful carbon sinks',
    summary:
      'Seagrasses capture carbon and store much of it in sediments beneath the seabed.',
    detail:
      'These underwater meadows also provide nurseries for marine life, stabilise sediment and improve coastal water quality.',
    action:
      'Avoid damaging seagrass areas while boating or visiting coasts.',
    source: 'UN Environment Programme',
    sourceUrl:
      'https://www.unep.org/resources/report/out-blue-value-seagrasses-environment-and-people',
  },
  {
    id: 44,
    category: 'Nature',
    icon: 'Flower2',
    value: 'Resilience',
    title: 'Biodiversity strengthens ecosystems',
    summary:
      'Diverse ecosystems are generally better able to cope with disturbances and changing conditions.',
    detail:
      'Climate action is stronger when it protects many species and ecological relationships instead of focusing only on carbon numbers.',
    action:
      'Grow native flowering plants that support local insects and birds.',
    source: 'Convention on Biological Diversity',
    sourceUrl: 'https://www.cbd.int/climate',
  },

  {
    id: 45,
    category: 'Lifestyle',
    icon: 'ShoppingBag',
    value: 'Production avoided',
    title: 'Second-hand products reuse an existing footprint',
    summary:
      'Buying a used item can avoid some of the materials and manufacturing required for a new one.',
    detail:
      'The benefit is often greatest for durable goods that still have a long useful life, such as furniture, tools and electronics.',
    action:
      'Check a trusted second-hand option before buying new.',
    source: 'United Nations ActNow',
    sourceUrl: 'https://www.un.org/en/actnow/ten-actions',
  },
  {
    id: 46,
    category: 'Lifestyle',
    icon: 'Smartphone',
    value: 'Keep it longer',
    title: 'A phone’s footprint begins before you switch it on',
    summary:
      'Mining, component production and manufacturing create much of an electronic device’s environmental impact.',
    detail:
      'Extending the life of a working phone reduces the frequency at which another device must be produced and transported.',
    action:
      'Use a protective case, replace the battery and repair when practical.',
    source: 'United Nations Environment Programme',
    sourceUrl:
      'https://www.unep.org/news-and-stories/story/electronics-have-rich-and-complex-waste-problem',
  },
  {
    id: 47,
    category: 'Lifestyle',
    icon: 'MonitorPlay',
    value: 'Less data',
    title: 'Video quality changes data demand',
    summary:
      'Higher-resolution video requires more data processing and transfer than lower-resolution video.',
    detail:
      'The carbon impact depends on networks, devices and electricity sources, but unnecessary ultra-high resolution can increase energy demand.',
    action:
      'Use standard definition on small screens when high resolution adds little value.',
    source: 'International Energy Agency',
    sourceUrl:
      'https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines',
  },
  {
    id: 48,
    category: 'Lifestyle',
    icon: 'Coffee',
    value: 'Reuse repeatedly',
    title: 'Reusable items need repeated use',
    summary:
      'A reusable cup, bottle or bag has an upfront production footprint that is spread across every use.',
    detail:
      'The environmental benefit grows when the same item is used many times instead of being replaced by repeated single-use products.',
    action:
      'Choose one reusable item and keep it where you will remember it.',
    source: 'UN Environment Programme',
    sourceUrl:
      'https://www.unep.org/interactives/beat-plastic-pollution/',
  },
  {
    id: 49,
    category: 'Lifestyle',
    icon: 'BadgeCheck',
    value: 'Lifetime value',
    title: 'Durability can matter more than a low purchase price',
    summary:
      'A product that lasts longer may need fewer replacements over the same period.',
    detail:
      'Repairability, warranty, spare parts and material quality are useful climate considerations alongside cost and appearance.',
    action:
      'Compare expected life and repair options before buying.',
    source: 'United Nations ActNow',
    sourceUrl: 'https://www.un.org/en/actnow/ten-actions',
  },
  {
    id: 50,
    category: 'Lifestyle',
    icon: 'Handshake',
    value: 'Share instead',
    title: 'Not every useful object needs one owner',
    summary:
      'Borrowing or sharing rarely used items increases the usefulness of products already manufactured.',
    detail:
      'Tools, books, sports equipment, decorations and event supplies often spend most of their life unused in storage.',
    action:
      'Create a small borrowing group with friends or neighbours.',
    source: 'Circular economy principle',
    sourceUrl: 'https://www.unep.org/circularity',
  },
]
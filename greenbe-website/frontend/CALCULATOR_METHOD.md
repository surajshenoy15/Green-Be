# Carbon calculator methodology (prototype)

The calculator is an educational estimator. It is intended to help users understand which entered activities contribute most; it is not a verified greenhouse-gas inventory.

## Factors currently hardcoded

| Activity | Prototype factor |
|---|---:|
| Indian grid electricity | 0.710 kg CO2 per kWh |
| 14.2 kg LPG cylinder | 43 kg CO2 per cylinder |
| Petrol car | 0.192 kg CO2e per vehicle-km |
| Diesel car | 0.171 kg CO2e per vehicle-km |
| Hybrid car | 0.105 kg CO2e per vehicle-km |
| Electric car | 0.071 kg CO2e per vehicle-km |
| Two-wheeler | 0.080 kg CO2e per vehicle-km |
| Bus | 0.104 kg CO2e per passenger-km |
| Train/metro | 0.041 kg CO2e per passenger-km |
| Flights | 0.125 kg CO2e per passenger-km |
| Red-meat meal | 5.0 kg CO2e per meal |
| Other meat meal | 2.5 kg CO2e per meal |
| Dairy serving | 0.4 kg CO2e per serving |
| Mixed waste | 0.45 kg CO2e per kg, adjusted by recycling input |
| Urban tree equivalency | 0.060 metric ton CO2 per tree per year |

## Source basis

- Central Electricity Authority, India, CO2 Baseline Database for the Indian Power Sector, Version 21.0: the FY 2024-25 import-adjusted weighted average grid factor is 0.710 tCO2/MWh, numerically equivalent to 0.710 kg CO2/kWh.
- UK Government 2025 greenhouse-gas conversion-factor methodology: used as a broad basis for passenger transport values such as average bus and flight factors.
- U.S. EPA Greenhouse Gas Equivalencies Calculator methodology: used for the educational urban-tree equivalency and propane/LPG combustion order of magnitude.

## Before production launch

1. Have the methodology reviewed by a qualified carbon-accounting specialist.
2. Replace generic food, vehicle, rail and waste factors with India-specific, documented datasets.
3. Decide whether to include well-to-tank emissions, aviation radiative forcing, vehicle occupancy and renewable-electricity claims.
4. Version every factor and show the methodology date inside the public calculator.
5. Avoid presenting the result as a certification or exact personal footprint.

# Realms: Blitz Production Dashboard

This dashboard allows players to visualize complex production chains and calculate net resource flows.

## Key Features

* **Multi-Tier Realm Simulation**: Track buildable hexes across Settlement (6), City (18), Kingdom (36), and Empire (60) tiers.
* **Production Chain Visualization**: Detailed breakdowns for Basic resources, Advanced materials, and T1 through T3 units.
* **Net Resource Flow**: A sticky header provides constant visibility of a simulated Realm's resource production and consumption.
* **UI Warnings**: The dashboard provides immediate visual feedback via red status outlines when the realm exceeds its building or population limits.
* **Dynamic Filtering**: Toggle views between Food, T1/T2/T3 resources, and specific unit types to keep the workspace organized.

## Tech Stack

* **Framework**: React (Vite)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **State Management**: Custom React Hooks (`useEconomy`)

## Local Setup

Follow these steps to get a local development environment running:

### 1. Prerequisites
Ensure you have **Node.js** installed on your machine.

### 2. Installation
Clone the repository and install the necessary dependencies:

```bash
git clone [https://github.com/Nexonik2/Realms-Blitz-Production-Dashboard.git](https://github.com/Nexonik2/Realms-Blitz-Production-Dashboard.git)
cd Realms-Blitz-Production-Dashboard
npm install

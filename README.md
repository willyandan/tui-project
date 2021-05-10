# TUI Backend

## Introduction

Briefing:For the purpose of this exercise, we're in a post-covid world without travel restrictions where the end user is a traveler using  
the internet to find hotel options.  

Your challenge is to build a 'microsite' and/or API that provides a functional solution for travelers to find the best and/or cheapest hotels available  
in the destinations specified below.  

In addition to providing visitors with a selection of offers for each destination, we also want to provide information on the local climate & weather.  

## Routes
### [GET] /api/hotel/search
query paramaters
- cityCode: IATA 3 code for the city
- lat: latitue
- lng: longitude
- radius: radius in Km of the central sphere using the coordinate system
- asc: Boolean for ascendant order of prices

### [GET] /api/hotel/:id
path paramaters
- id: hotel id

## Installation
```bash
yarn instal  
yarn tsnd src/app.ts
```  

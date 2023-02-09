# Fuel Prices Project

=> The project is live https://www.onfuelsaver.tk

Please note these prices are not the actual prices, they are from January 2022 and are resetting ever week!

## Intention

This project is based on the free database of German fuel price comparisons ([Market Transparency Unit for Fuels](https://www.bundeskartellamt.de/EN/Economicsectors/MineralOil/MTU-Fuels/mtufuels_node.html;jsessionid=EA811A904ED187307C9BEFA50CCA8F8D.2_cid371)).   

The whole database is about 50GB compressed and uncompressed around 150GB. For this reason a slice of one week (first week of 2022) and one town (Berlin) was taken out, since most PCs just don't have over 150GB of RAM to process the whole database.

The next step was to use several [sed](https://en.wikipedia.org/wiki/Sed) commands to realign the data, e.g. the absolute date was changed to a relative data, that you can experience one week in realtime.

I can promise you in advance, you will be surprised how much deviation there is in the fuel prices even in one hour - there were difference of over 20 Cents in one hour in Berlin. At first I thought I had made a mistake, but no, this is actually real.

This is so amazing, I am still baffled, if you have e.g. a large SUV with a fuel tank of 100l+ this is actually over 20 € per filling!

**Amazing!
**

## How to run the simulation

First you need to start the server - a RESTful API. For this you will find a README.md in the server folder.

The full experience you will get, if you actually let it run for 7 days. Yes, you heard correctly, this is a realtime simulation.

The frontend is in the client folder (also with a README.md). This is a nice UI where you can either access it in user mode (registered and unregistered) or in admin mode with an admin area with cool analytics.

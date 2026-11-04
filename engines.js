/* Block Builder engine database + teardown/photo generators.
   Columns: make|name|layout|displacement|years|valvetrain|timing|fuel|block|boost(0/1)|flags|applications|note
   flags: dist int tty vvt bal dry dod cr idi hp sc rotary. Always verify specs against the factory service manual. */
const RAW = `
Chevrolet|Small Block 283 / 327 (Gen I)|V8|4.6L / 5.4L|1957–1969|ohv|chain|carb|iron|0|dist|Corvette, Camaro, Chevelle, Impala, Nova|The distributor also drives the oil pump through a shaft. Mark the rotor and body position before pulling it. Check casting numbers before ordering parts.
Chevrolet|Small Block 350 (Gen I, carbureted)|V8|5.7L|1967–1992|ohv|chain|carb|iron|0|dist|Camaro, Corvette, Chevelle, Caprice, C/K trucks|Early blocks use a 2-piece rear main seal and later ones a 1-piece. Confirm before buying gaskets. The camshaft sits in the block.
Chevrolet|Small Block 350 TBI / TPI (Gen I)|V8|5.7L|1987–1995|ohv|chain|efi|iron|0|dist|Corvette, Camaro, Firebird, C/K trucks|Tuned port injection hides under the plenum and runners. Photograph every vacuum line and connector before anything comes off.
Chevrolet|Small Block Vortec 5.7 (L31)|V8|5.7L|1996–2005|ohv|chain|efi|iron|0|dist|Silverado, Suburban, Astro, Express|The center-bolt "spider" fuel injection sits under the intake. Keep it intact and photograph the poppet lines.
Chevrolet|Small Block 400|V8|6.6L|1970–1980|ohv|chain|carb|iron|0|dist|Chevelle, Monte Carlo, C/K trucks|Siamesed bores run hot. Check every cylinder wall carefully for cracks and thin spots. Internally balanced.
Chevrolet|Big Block Mark IV 396 / 402 / 427 / 454|V8|6.5L–7.4L|1965–1990|ohv|chain|carb|iron|0|dist|Corvette, Chevelle, Impala, C/K trucks|Very heavy. Use a rated hoist and a high-capacity stand. Keep pushrods and rockers in order.
Chevrolet|Vortec 7400 / 8100 Big Block|V8|7.4L / 8.1L|1996–2009|ohv|chain|efi|iron|0||Suburban, Silverado HD, Kodiak|Heavy-duty truck engine. Use a rated hoist and label every injector and sensor connector.
Chevrolet|LS1 / LS6|V8|5.7L|1997–2005|ohv|chain|efi|alu|0|dist|Corvette C5, Camaro, Firebird, GTO|Aluminum block: bolts thread into soft metal, so use a torque wrench and never an impact. Many cars use the Opti-Spark ignition on the front.
Chevrolet|LS2 / LS3 / L92|V8|6.0L / 6.2L|2005–2017|ohv|chain|efi|alu|0||Corvette C6, Camaro SS, G8, Escalade|Late LS engines use coils on the valve covers. Bag each coil, injector and sensor by cylinder.
Chevrolet|LS7|V8|7.0L|2006–2013|ohv|chain|efi|alu|0|dry|Corvette Z06, Camaro Z/28|Dry sump system with extra oil lines and a tank, so label everything. Titanium connecting rods: handle gently.
Chevrolet|Iron LS Truck 4.8 / 5.3 / 6.0|V8|4.8L–6.0L|1999–2007|ohv|chain|efi|iron|0||Silverado, Sierra, Tahoe, Express|Same layout as other Gen III LS engines but with a heavy iron block. Standard LS lifters.
Chevrolet|5.3 / 6.0 / 6.2 with AFM / DOD|V8|5.3L–6.2L|2007–2018|ohv|chain|efi|alu|0|dod|Silverado, Sierra, Tahoe, Yukon|Cylinder deactivation lifters. Keep every lifter and its tray in order and inspect each for collapse or sticking.
Chevrolet|LT1 / L86 (Gen V)|V8|5.3L–6.2L|2014–Present|ohv|chain|di|alu|0|dod|Corvette C7, Camaro, Silverado|Direct injection: the high-pressure fuel pump runs off the cam. Cap every fuel port. Expect carbon on the intake valves.
Chevrolet|LT4 Supercharged|V8|6.2L|2015–2019|ohv|chain|di|alu|1|dod sc|Corvette Z06, Camaro ZL1, Cadillac CTS-V|Supercharger and intercooler loop: drain the coolant loop and photograph the hose routing.
Chevrolet|LT1 (Gen II)|V8|5.7L|1992–1997|ohv|chain|efi|alu|0|dist|Corvette C4, Camaro, Firebird, Caprice|Reverse-flow cooling. The Opti-Spark sits behind the water pump, so keep it dry and photograph it.
Chevrolet|60° V6 2.8 / 3.1 / 3.4|V6|2.8L–3.4L|1980–2005|ohv|chain|efi|iron|0||S-10, Camaro, Cavalier, Lumina, Grand Prix|Intake gasket leaks are common. Look for coolant in the oil.
Chevrolet|Vortec 4.3 V6|V6|4.3L|1985–2014|ohv|chain|efi|iron|0||S-10, Astro, Silverado, Express|Based on the small block with two cylinders removed, so most steps match.
Chevrolet|Ecotec 2.0 / 2.2 / 2.4|I4|2.0L–2.4L|2002–2016|dohc|chain|efi|alu|0|vvt|Cobalt, HHR, Malibu, Equinox, Solstice|Phasers are oil-pressure controlled. Hold the cam on its wrench flats and never use an impact.
Chevrolet|2.0T Turbo (LNF / LHU)|I4|2.0L|2008–2015|dohc|chain|di|alu|1|vvt|Cobalt SS, Solstice GXP, Sky Redline|Direct injection pump on the cam. Cap fuel ports and photograph turbo oil and coolant lines.
Chevrolet|Iron Duke 2.5|I4|2.5L|1977–1993|ohv|chain|tbi|iron|0|dist|S-10, Fiero, Celebrity|Simple pushrod four with a distributor. Keep pushrods in order and mark the rotor position.
Chevrolet|Duramax 6.6 (LB7–LML)|V8|6.6L|2001–2016|ohv|gear|dsl|iron|1|cr tty|Silverado HD, Sierra HD|Common-rail injectors are held with clamps. Keep them in order and cap every opening. Head bolts are torque-to-yield.
Chevrolet|Duramax 6.6 L5P|V8|6.6L|2017–Present|ohv|gear|dsl|iron|1|cr tty|Silverado HD, Sierra HD|Latest Duramax with high-pressure common rail. Wait and follow the factory procedure before opening fuel lines.
GM|Detroit Diesel 6.2 / 6.5|V8|6.2L / 6.5L|1982–2002|ohv|gear|dsl|iron|0|idi|C/K trucks, Hummer H1, Humvee|Indirect injection diesel. The injection pump is driven off the timing set, so mark its position.
Pontiac|V8 326–455|V8|5.4L–7.5L|1955–1979|ohv|chain|carb|iron|0|dist|GTO, Firebird, Trans Am, Bonneville|Blocks look alike but differ inside. Identify by casting number and year code before buying parts.
Oldsmobile|Rocket V8 350 / 400 / 455|V8|5.7L–7.5L|1964–1990|ohv|chain|carb|iron|0|dist|442, Cutlass, Toronado|Olds and Chevy 350s look similar but share almost no parts. Check casting date codes.
Buick|3800 V6 (Series I / II / III)|V6|3.8L|1988–2008|ohv|chain|efi|iron|0||Regal, Century, LeSabre, Grand Prix, Camaro, Firebird|Plastic intake gaskets and the coolant crossover are failure points. Look for coolant in the oil.
Cadillac|Northstar 4.6|V8|4.6L|1993–2011|dohc|chain|efi|alu|0|tty|DeVille, STS, Seville, Eldorado|Head bolt threads in the aluminum block are a known failure point. Inspect the threads and plan for repair inserts.
Ford|Windsor 289 / 302|V8|4.7L / 4.9L|1962–1995|ohv|chain|carb|iron|0|dist|Mustang, Fairlane, Falcon, F-100|The distributor drives the oil pump. Firing order differs between early 302 and 5.0 HO engines, so confirm for your year.
Ford|5.0 HO EFI|V8|5.0L|1986–1995|ohv|chain|efi|iron|0|dist|Mustang GT, Thunderbird, Crown Victoria, Ranger|Roller lifters with retainers. Keep them in order. Photograph all harness connectors.
Ford|Windsor 351W|V8|5.8L|1969–1996|ohv|chain|carb|iron|0|dist|Mustang, F-150, Bronco, Crown Victoria|Taller deck than a 302, so many parts do not interchange. Verify the engine before buying parts.
Ford|Cleveland 351C / 400M|V8|5.8L / 6.6L|1970–1982|ohv|chain|carb|iron|0|dist|Mustang, Torino, Ranchero, F-series|2V and 4V heads differ, and the 351M/400 are a different engine from the 351C. Identify casting numbers.
Ford|FE 390 / 427 / 428|V8|6.4L / 7.0L|1958–1976|ohv|chain|carb|iron|0|dist|Galaxie, Mustang, Cobra, F-series|Side-oiler 427 engines have different oil routing. Identify yours before assuming.
Ford|385 Series 429 / 460|V8|7.0L / 7.5L|1968–1997|ohv|chain|carb|iron|0|dist|Thunderbird, F-250, E-350, Lincoln|Very heavy. Use a rated hoist and stand.
Ford|Modular 4.6 / 5.4 SOHC (2V / 3V)|V8|4.6L / 5.4L|1991–2014|sohc|chain|efi|alu|0|vvt|Mustang GT, Crown Victoria, F-150, Expedition|Plastic parts in the timing set on 3V engines. Spark plugs on 3V engines can break during removal, so use the correct procedure.
Ford|Modular 4.6 DOHC|V8|4.6L|1996–2004|dohc|chain|efi|alu|0||SVT Cobra, Mark VIII, Mach 1|Four overhead cams with chain tensioners. Cam locking tools are strongly recommended.
Ford|5.0 Coyote|V8|5.0L|2011–Present|dohc|chain|efi|alu|0|vvt|Mustang GT, F-150|Ti-VCT phasers. Newer versions add direct injection, so cap fuel ports.
Ford|6.2 SOHC|V8|6.2L|2010–Present|sohc|chain|efi|alu|0||F-250, F-350, E-series|Two-valve SOHC truck engine. Mark the timing set and cam positions.
Ford|7.3 Godzilla|V8|7.3L|2020–Present|ohv|chain|efi|iron|0||F-250, F-350, E-series|Pushrod truck V8 with a cam in the block. Heavy iron, so use a rated hoist.
Ford|2.3 Lima / Pinto|I4|2.3L|1974–1997|sohc|belt|efi|iron|0|dist|Mustang, Ranger, Bronco II, Thunderbird|Belt-driven cam. Mark the belt and check the tensioner. Many early versions are carbureted.
Ford|2.0 / 2.3 EcoBoost|I4|2.0L–2.3L|2013–Present|dohc|chain|di|alu|1|vvt|Mustang EcoBoost, Focus ST, Ranger, Explorer|Direct-injected turbo. Cap fuel ports and photograph the turbo coolant lines.
Ford|3.5 EcoBoost|V6|3.5L|2011–Present|dohc|chain|di|alu|1|vvt|F-150, Explorer, Taurus SHO, Expedition|Twin turbo. Photograph all intercooler piping and turbo oil and coolant lines.
Ford|Essex 3.8 / 3.9|V6|3.8L|1983–2007|ohv|chain|efi|iron|0||Mustang, Thunderbird, Taurus, Windstar|Head gasket and intake gasket issues are known. Check the coolant and oil.
Ford|Cologne 4.0 V6 (OHV)|V6|4.0L|1990–2001|ohv|chain|efi|iron|0||Ranger, Explorer, Aerostar|Pushrod V6. Keep pushrods and rockers in order and mark their positions.
Ford|4.0 SOHC V6|V6|4.0L|1997–2010|sohc|chain|efi|alu|0||Explorer, Ranger, Mountaineer|Plastic timing chain guides and tensioners are a known wear item. Inspect them closely.
Ford|300 Inline Six|I6|4.9L|1965–1996|ohv|gear|carb|iron|0|dist|F-series, Bronco, E-series|Famously durable. Gear-driven cam instead of a chain.
Ford|Power Stroke 7.3 DI|V8|7.3L|1994–2003|ohv|gear|dsl|iron|1|hp|F-250, F-350, Excursion, E-series|HEUI injection uses high-pressure oil. Keep the oil rail and injectors labeled.
Ford|Power Stroke 6.0|V8|6.0L|2003–2007|ohv|gear|dsl|iron|1|hp tty|F-250, F-350, Excursion, E-series|Known for head gasket and EGR cooler failures. Inspect the oil cooler and EGR cooler. Many rebuilds replace head bolts with studs.
Ford|Power Stroke 6.4|V8|6.4L|2008–2010|ohv|gear|dsl|iron|1|cr tty|F-250, F-350|Common rail with compound turbos. Photograph all turbo and EGR plumbing.
Ford|Power Stroke 6.7|V8|6.7L|2011–Present|ohv|gear|dsl|iron|1|cr|F-250, F-350|The turbo sits in the valley. Photograph the plumbing before removal.
Ford|Triton V10 6.8|V10|6.8L|1997–2023|sohc|chain|efi|alu|0||F-250, E-series, Excursion|Shares design with the Modular V8s. Mark cylinders 1 to 10 and label coil packs.
Chrysler|Slant Six 225|I6|3.7L|1960–1987|ohv|chain|carb|iron|0|dist|Valiant, Dart, Duster, Ramcharger|Tilted 30 degrees and very durable. Keep pushrods in order.
Chrysler|LA V8 318 / 340 / 360|V8|5.2L–5.9L|1964–1992|ohv|chain|carb|iron|0|dist|Dart, Duster, Challenger, Ram|Magnum versions from 1992 are fuel injected. Keep pushrods and rockers in order.
Chrysler|Magnum V8 5.2 / 5.9|V8|5.2L / 5.9L|1992–2003|ohv|chain|efi|iron|0||Ram, Dakota, Durango|Roller cam with lifter retainers. Keep lifters in order.
Chrysler|B / RB 383 / 400 / 426W / 440|V8|6.3L–7.2L|1959–1978|ohv|chain|carb|iron|0|dist|Charger, Road Runner, Coronet, Imperial|Heavy iron. RB engines have a taller deck than B engines. Verify by casting number.
Chrysler|426 Hemi (Gen II)|V8|7.0L|1964–1971|ohv|chain|carb|iron|0|dist|Charger, Road Runner, Barracuda|Rare and valuable, so document and bag everything. The hemi heads are very heavy. Get help lifting them.
Chrysler|Gen III Hemi 5.7 / 6.1 / 6.4|V8|5.7L–6.4L|2003–Present|ohv|chain|efi|iron|0|dod|Ram, Charger, Challenger, 300, Durango|MDS lifters on many versions. Keep lifters in order and inspect cam lobes.
Chrysler|Pentastar 3.6|V6|3.6L|2011–Present|dohc|chain|efi|alu|0|vvt|Wrangler, Grand Cherokee, Charger, Ram, minivans|Roller rocker arms can fail in some engines. Keep them in order and inspect.
Jeep|4.0 / 4.2 Inline Six (AMC)|I6|4.0L / 4.2L|1987–2006|ohv|chain|efi|iron|0||Cherokee XJ, Wrangler, Grand Cherokee|Simple, durable pushrod six. Check the head for cracks between valve seats.
AMC|V8 290 / 304 / 360 / 401|V8|4.8L–6.6L|1966–1991|ohv|chain|carb|iron|0|dist|Javelin, AMX, Wagoneer, CJ|Parts do not interchange with Chrysler or Ford. Identify by casting number and engine code.
Dodge|Viper V10|V10|8.0L–8.4L|1992–2017|ohv|chain|efi|alu|0||Viper, Ram SRT-10|Large aluminum V10. Photograph all coil, injector and sensor connectors by cylinder.
Cummins|5.9 12-Valve (6BT)|I6|5.9L|1989–1998|ohv|gear|dsl|iron|1||Ram 2500, 2500, 3500|Mechanical injection pump. Mark the pump timing before removal.
Cummins|5.9 24-Valve|I6|5.9L|1998–2007|ohv|gear|dsl|iron|1||Ram 2500, 3500|Early versions use a VP44 pump and later versions use common rail. Identify yours first.
Cummins|6.7|I6|6.7L|2007–Present|ohv|gear|dsl|iron|1|cr|Ram 2500, 3500, 4500|Emissions equipment, DPF and EGR. Photograph all plumbing and sensors.
Toyota|22R / 22RE|I4|2.4L|1981–1995|sohc|chain|efi|iron|0||Pickup, 4Runner, Celica|Timing chain guides and tensioners are a known wear item. Heads crack if overheated.
Toyota|5VZ-FE 3.4 V6|V6|3.4L|1995–2004|dohc|belt|efi|alu|0||Tacoma, T100, Tundra, 4Runner|Timing belt. Replace belt, tensioner and water pump together.
Toyota|2JZ-GE|I6|3.0L|1991–2005|dohc|belt|efi|iron|0|vvt|Supra, Aristo, Chaser, Mark II|Iron block, aluminum head, timing belt. VVT-i versions have oil control valves to protect.
Toyota|2JZ-GTE|I6|3.0L|1991–2005|dohc|belt|efi|iron|1||Supra, Aristo|Twin turbo version. Photograph all turbo plumbing.
Toyota|1JZ-GTE|I6|2.5L|1990–2007|dohc|belt|efi|iron|1||Chaser, Soarer, Mark II|Turbo inline six. Photograph all intercooler and vacuum lines.
Toyota|4A-GE|I4|1.6L|1983–2002|dohc|belt|efi|iron|0||AE86, Corolla, MR2|Small and simple. Mark the belt and cam positions.
Toyota|1UZ-FE / 2UZ-FE|V8|4.0L / 4.7L|1989–2009|dohc|belt|efi|alu|0||LS400, Land Cruiser, Tundra, 4Runner|Belt-driven V8. Replace belt and water pump together.
Toyota|2GR-FE|V6|3.5L|2005–Present|dohc|chain|efi|alu|0|vvt|Camry, Tacoma, Highlander, Lexus|Dual VVT-i. The front cover has several sealant areas, so photograph bolt positions.
Toyota|2AZ-FE|I4|2.4L|2002–2009|dohc|chain|efi|alu|0|vvt|Camry, RAV4, Solara, Scion tC|Head bolt threads in the aluminum block are a known failure point. Inspect threads.
Toyota|1FZ-FE|I6|4.5L|1992–2007|dohc|gear|efi|iron|0||Land Cruiser|Gear-driven cams. Mark gears before removal.
Toyota|1HZ / 1HD-T|I6|4.2L|1990–2007|sohc|gear|dsl|iron|1||Land Cruiser 70, 80, 100|Diesel inline six. Mark the injection pump position.
Toyota|7M-GE / 7M-GTE|I6|3.0L|1986–1992|dohc|belt|efi|iron|0||Supra Mk III|Head gasket failures are known, especially on the turbo. Use head studs on reassembly.
Honda|B16A / B18C|I4|1.6L / 1.8L|1989–2001|dohc|belt|efi|alu|0|dist|Civic Si, Integra GS-R, Type R|VTEC rocker assemblies. Keep cam caps and rockers in order.
Honda|D-Series 1.5 / 1.6|I4|1.5L / 1.6L|1988–2000|sohc|belt|efi|alu|0|dist|Civic, CRX, Del Sol|Distributor sits in the head. Mark its position. VTEC on some versions.
Honda|H22A / H23A|I4|2.2L / 2.3L|1992–2001|dohc|belt|efi|alu|0||Prelude, Accord|Large VTEC four. Keep cam caps and rockers in order.
Honda|F20C / F22C|I4|2.0L / 2.2L|1999–2009|dohc|chain|efi|alu|0||S2000|High-revving four. Mark chain and cam positions.
Honda|K20 / K24|I4|2.0L–2.4L|2001–2015|dohc|chain|efi|alu|0|vvt bal|Civic Si, RSX, Accord, CR-V, TSX|i-VTEC head with rocker arms. K24 versions use balance shafts. Note alignment marks.
Honda|J32 / J35|V6|3.2L / 3.5L|1996–2020|sohc|belt|efi|alu|0|vvt|Accord, Odyssey, Pilot, Acura TL|VCM versions can show ring wear and carbon on the deactivated cylinders. Replace belt, tensioner and water pump together.
Nissan|SR20DE / SR20DET|I4|2.0L|1989–2002|dohc|chain|efi|iron|0||240SX, Silvia, Sentra SE-R|Iron block, aluminum head. Turbo versions add plumbing to photograph.
Nissan|RB25DET / RB26DETT|I6|2.5L / 2.6L|1989–2002|dohc|belt|efi|iron|1||Skyline GT-R, Silvia, Stagea|Belt-driven inline six. RB26 twin turbo has a lot of plumbing. Handle cam towers carefully.
Nissan|VQ35DE|V6|3.5L|2002–2013|dohc|chain|efi|alu|0|vvt|350Z, G35, Altima, Maxima|Timing chain stretch and guide wear are known. Photograph cover bolt lengths.
Nissan|VG30DE / VG30DETT|V6|3.0L|1984–1996|dohc|belt|efi|iron|0||300ZX, Maxima, Pathfinder|Belt-driven V6. The twin turbo Z32 has extensive plumbing to photograph.
Nissan|KA24DE|I4|2.4L|1989–2004|dohc|chain|efi|iron|0||240SX, Altima, Frontier|Iron block, chain driven. Mark chain and cam positions.
Nissan|L28 / L28ET|I6|2.8L|1975–1983|sohc|chain|efi|iron|0||280Z, 280ZX|Chain-driven SOHC six. Photograph the injection wiring.
Nissan|VK56DE|V8|5.6L|2004–Present|dohc|chain|efi|alu|0||Titan, Armada, QX56, Infiniti|Large truck V8. Photograph the chain cover and bolt positions.
Subaru|EJ20 / EJ25 SOHC|H4|2.0L / 2.5L|1990–2011|sohc|belt|efi|alu|0||Impreza, Legacy, Forester, Outback|Two separate heads, so label left and right. Head gasket weakness on 2.5L (1999–2011).
Subaru|EJ20 / EJ205 / EJ207 Turbo|H4|2.0L|1992–2007|dohc|belt|efi|alu|1||Impreza WRX, STI|Turbo with plenty of plumbing. Label left and right heads.
Subaru|EJ255 / EJ257|H4|2.5L|2004–2021|dohc|belt|efi|alu|1||WRX, STI, Forester XT|Rod bearings and piston ring lands are known issues on abused engines. Inspect carefully.
Subaru|FA20 / FA24 / FB25|H4|2.0L–2.5L|2011–Present|dohc|chain|di|alu|0|vvt|BRZ, Impreza, Outback, WRX|Direct injection and chain drive. Cap fuel ports. Label left and right heads.
Volkswagen|Type 1 Air-Cooled 1200–1600|H4|1.2L–1.6L|1936–2003|ohv|gear|carb|alu|0|dist|Beetle, Bus, Karmann Ghia|Case halves are held with through studs. Mark sheet metal, shrouds and cylinder positions.
Volkswagen|1.8T (AEB / AWP / APY)|I4|1.8L|1997–2005|dohc|belt|efi|iron|1||Jetta, Golf, Beetle, Passat, Audi A4|Belt-driven. Plastic coolant flanges are brittle. Photograph turbo lines.
Volkswagen|2.0 TSI (EA888)|I4|2.0L|2008–Present|dohc|chain|di|alu|1|vvt|GTI, Jetta, Audi A4, Tiguan|Early chain tensioners are a known issue. Direct injection leads to intake valve carbon.
Volkswagen|VR6 2.8 / 2.9|V6|2.8L / 2.9L|1991–2005|sohc|chain|efi|iron|0||Corrado, Golf, Jetta, Passat|Narrow-angle V6 with one head. The timing chain sits on the transmission end.
Volkswagen|1.9 TDI (ALH / BEW)|I4|1.9L|1996–2006|sohc|belt|dsl|iron|1||Golf, Jetta, Beetle, Passat|ALH uses an injection pump driven by the belt. BEW uses unit injectors driven off the cam.
Volkswagen|2.0 TDI Common Rail|I4|2.0L|2009–2014|dohc|belt|dsl|alu|1|cr|Jetta, Golf, Passat, Audi A3|High-pressure fuel pump and emissions parts. Photograph all plumbing.
Porsche|M96 / M97 Flat-Six|H6|2.7L–3.8L|1997–2008|dohc|chain|efi|alu|0||Boxster, Cayman, 911 (996, 997)|The IMS bearing is a known failure point. Inspect the IMS area and rear main seal.
Porsche|911 3.2 Air-Cooled|H6|3.2L|1984–1989|sohc|chain|efi|alu|0||911 Carrera|Two heads with separate cam drives. Label everything left and right.
BMW|M20 2.5 / 2.7|I6|2.5L–2.7L|1977–1994|sohc|belt|efi|iron|0||325i, 525i, 320i|Aluminum head on an iron block. Check head flatness if it has overheated.
BMW|M50 / M52 / M54|I6|2.5L–3.0L|1990–2006|dohc|chain|efi|alu|0|vvt|325i, 328i, 330i, Z3, Z4, X5|Plastic cooling parts are brittle. Do not rotate the crank with the VANOS unit removed.
BMW|S54|I6|3.2L|2000–2006|dohc|chain|efi|alu|0|vvt|E46 M3, Z4 M|Rod bearing wear is a known issue. Inspect the bearings and measure clearances.
BMW|N52|I6|3.0L|2004–2015|dohc|chain|efi|alu|0|vvt|328i, 528i, X3, Z4|Valvetronic motor and eccentric shaft. Keep that assembly intact. Plastic cooling parts are brittle.
BMW|N54 Twin Turbo|I6|3.0L|2006–2015|dohc|chain|di|alu|1|vvt|335i, 135i, 535i, Z4|Lots of vacuum and turbo plumbing. Photograph all of it.
BMW|S65|V8|4.0L|2007–2013|dohc|chain|efi|alu|0|vvt|E9x M3|Rod bearing wear is a known issue. Inspect and measure the bearings.
Mercedes-Benz|OM617 Diesel|I5|3.0L|1974–1985|sohc|chain|dsl|iron|1|idi|240D, 300D, 300SD|Famously durable. Mechanical injection pump. Mark its position.
Mercedes-Benz|M113 V8|V8|4.3L–5.5L|1997–2011|sohc|chain|efi|alu|0||E430, ML, S-class, AMG|Chain at the front with two plugs per cylinder. Photograph coil and plug wire routing.
Mercedes-Benz|M104 Inline Six|I6|2.8L–3.2L|1989–1999|dohc|chain|efi|iron|0||E320, C280, SL320|Plastic timing chain guide rails become brittle. Replace them on reassembly.
Mazda|13B-REW Rotary|R2|1.3L (2 rotor)|1993–2002|rotary|—|efi|alu|1|rotary|RX-7 FD|No pistons or valves. Apex seals and rotor housings are the wear items. Keep every seal and spring in order.
Mazda|13B Renesis Rotary|R2|1.3L (2 rotor)|2003–2012|rotary|—|efi|alu|0|rotary|RX-8|Side-port rotary. Keep seals and springs in order and photograph the housing stack.
Mazda|BP 1.8 / 1.6|I4|1.8L|1990–2005|dohc|belt|efi|iron|0||Miata|Belt-driven. Mark the belt and cam positions.
Mazda|MZR 2.0 / 2.3|I4|2.0L / 2.3L|2001–2013|dohc|chain|efi|alu|0|vvt|Mazda3, Mazda6, Miata NC|Chain-driven with VVT. Mark chain and phaser positions.
Mitsubishi|4G63 / 4G63T|I4|2.0L|1989–2007|dohc|belt|efi|iron|1|bal|Eclipse DSM, Lancer Evo, Galant VR-4|Balance shafts on many versions. Early engines are known for crank walk, so check thrust bearing play.
Land Rover|Rover V8|V8|3.5L–4.6L|1961–2004|ohv|chain|efi|alu|0|dist|Defender, Discovery, Range Rover, MGB GT V8|Aluminum block and heads. Wet liner slip is a known issue on 4.0 and 4.6 engines.
Jaguar|XK 4.2 Straight Six|I6|4.2L|1965–1987|dohc|chain|carb|iron|0|dist|E-Type, XJ6, Mk II|Large twin-cam cylinder head with duplex chain. Mark cam and head orientation.
Volvo|B230|I4|2.3L|1985–1998|sohc|belt|efi|iron|0||240, 740, 940|Famously durable. Belt-driven. Photograph belt marks.
`;
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const cylN = c => ({ I3: 3, I4: 4, I5: 5, I6: 6, V6: 6, V8: 8, V10: 10, V12: 12, H4: 4, H6: 6, R2: 2 })[c] || 4;
const ENGINES = RAW.trim().split('\n').map(l => {
  const [make, name, cfg, disp, years, valve, timing, fuel, block, boost, flags, apps, note] = l.split('|');
  return { id: slug(make + ' ' + name), make, name, title: make + ' ' + name, cfg, disp, years, valve, timing, fuel, block, boost: boost === '1', flags: new Set((flags || '').split(' ').filter(Boolean)), apps, note };
});
const mkCustom = c => ({ id: 'custom', make: 'Custom', name: `${c.cfg} ${c.valve.toUpperCase()}`, title: `Custom ${c.cfg} ${c.valve.toUpperCase()}`, cfg: c.cfg, disp: c.disp || '', years: '', valve: c.valve, timing: c.timing, fuel: c.fuel, block: c.block, boost: !!c.boost, flags: new Set([...(c.dist ? ['dist'] : []), ...(c.cfg === 'R2' ? ['rotary'] : [])]), apps: '', note: 'Custom engine. Steps are built from the options you picked.' });
const VALVE = { ohv: 'Pushrod OHV', sohc: 'SOHC', dohc: 'DOHC', rotary: 'Rotary' }, TIMING = { chain: 'Chain', belt: 'Belt', gear: 'Gears', '—': 'None' }, FUEL = { carb: 'Carburetor', tbi: 'Throttle-body injection', efi: 'Port injection', di: 'Direct injection', dsl: 'Diesel' };

function tipsFor(e) {
  const f = e.flags, t = [];
  if (f.has('int')) t.push('Interference engine: never rotate the crank or cams on their own once the timing set is off.');
  if (f.has('tty')) t.push('Torque-to-yield head bolts stretch when tightened. Do not reuse them.');
  if (f.has('vvt')) t.push('Variable valve timing: mark phaser positions, hold cams on their wrench flats, and never use an impact on phasers.');
  if (f.has('bal')) t.push('Balance shafts: note the alignment marks before removing them.');
  if (f.has('dry')) t.push('Dry sump: label the tank and every scavenge and pressure line.');
  if (f.has('dist')) t.push('Distributor: mark the rotor and housing position to the block before pulling it.');
  if (f.has('dod')) t.push('Cylinder deactivation lifters: keep every lifter and tray in order.');
  if (f.has('cr')) t.push('Common rail fuel: very high pressure. Wait and follow the factory procedure before opening lines.');
  if (e.boost) t.push('Boosted: photograph turbo, intercooler and wastegate plumbing, and cap every open line.');
  if (e.block === 'alu') t.push('Aluminum block: never use an impact on its bolts, and keep sealing surfaces away from steel tools.');
  if (e.timing === 'belt') t.push('Belt drive: mark belt direction and photograph timing marks. Replace belt, tensioner and water pump on reassembly.');
  if (/^[VH]/.test(e.cfg)) t.push('Two banks: label left and right, and which bank holds cylinder 1.');
  t.push('Always confirm torque values, sequences and clearances in the factory service manual for your exact engine.');
  return t;
}

function stepsFor(e) {
  const st = [], A = (ph, t, d, tip) => st.push({ ph, t, d, tip }), f = e.flags, V = /^[VH]/.test(e.cfg), carb = e.fuel === 'carb', dsl = e.fuel === 'dsl', inj = ['efi', 'di', 'tbi'].includes(e.fuel);
  A('Prep', 'Photograph everything first', 'Run the guided Photos walk-through for every angle, hose, wire and belt before anything comes off. Take more shots than you think you need.', 'Open the Photos tab.');
  A('Prep', 'Set up your workspace', 'Clean bench, zip bags, painter’s tape, a marker and magnetic trays. Plan to bag and label fasteners by system as they come off.');
  A('Prep', 'Drain the fluids', 'Drain oil, coolant and any fuel. Check each for metal flakes, a milky look or a fuel smell. These show why the engine failed.', 'Photograph the drained oil and coolant.');
  A('Prep', carb ? 'Shut off fuel and disconnect the battery' : dsl ? 'Disconnect the battery and cap fuel lines' : 'Relieve fuel pressure and disconnect the battery', carb ? 'Disconnect the battery, plug fuel lines and keep ignition sources away.' : f.has('cr') ? 'Common-rail systems hold very high pressure. Let the engine sit and follow the factory procedure before loosening high-pressure lines.' : 'Relieve fuel pressure per the factory procedure before opening any line. Cap or tape every open line.');
  A('Prep', 'Mount the engine on a stand', 'Use a rated stand and grade-8 bolts of the correct length into the bellhousing flange. Make sure the stand and hoist are rated for the engine weight, and level it before releasing the hoist.' + (e.block === 'alu' ? ' Do not thread bolts deeper than the flange allows into aluminum.' : ''), 'Keep fingers clear of the stand’s pinch points.');
  if (f.has('rotary')) return rotarySteps(e, A, st);
  A('Externals', carb ? 'Remove the air cleaner, carburetor and linkage' : 'Remove the air intake and throttle body', carb ? 'Label vacuum ports and linkage as you go. Photograph the choke and throttle linkage before disconnecting.' : 'Remove intake ducting and the throttle body. Label every vacuum and coolant hose and unplug sensors.');
  if (e.boost) A('Externals', 'Remove turbo or supercharger plumbing', 'Remove charge piping, intercooler lines and turbo oil and coolant lines. Cap every open port so nothing falls in.', 'Photograph each connection before loosening.');
  if (inj || dsl) A('Externals', 'Label and unplug the wiring harness', 'Photograph each connector and label it with tape. Map the harness routing before lifting it off.', 'Use the Photos tab for close-ups of each connector.');
  A('Externals', f.has('dist') ? 'Mark and remove the distributor and ignition' : inj ? 'Remove coils and spark plugs' : dsl ? 'Remove glow plugs and sensors' : 'Remove ignition components', f.has('dist') ? 'Mark the rotor position and the housing position against the block with paint, then pull the distributor. Photograph plug wire order with cylinder numbers.' : dsl ? 'Remove glow plugs and sensors. Bag and label them by cylinder.' : 'Bag each coil and plug by cylinder. Photograph the plug condition for each cylinder.');
  A('Externals', carb ? 'Remove the fuel pump and lines' : dsl ? 'Remove the injectors' : 'Remove the fuel rail and injectors', dsl ? 'Use the correct puller and clamps for the injectors. Keep them in cylinder order and cap every opening.' : carb ? 'Remove the mechanical fuel pump and bag fuel line fittings.' : 'Remove the rail and injectors together. Keep them in cylinder order and cap the ports.');
  A('Externals', 'Remove the intake manifold', V ? 'Loosen bolts in reverse sequence in stages. Expect coolant to seep out. Keep the gasket to study its wear pattern.' : 'Loosen bolts evenly in stages from the outside in. Keep the gasket to study its wear pattern.');
  A('Externals', e.boost ? 'Remove exhaust manifolds and turbo' : 'Remove exhaust manifolds or headers', 'Use penetrating oil on studs. Broken studs are common, so work slowly. Let the engine cool before touching aluminum parts.');
  A('Externals', 'Photograph the belt, then remove accessories', 'Photograph the belt routing and tensioner position first. Remove alternator, AC compressor, power steering pump, idlers and the tensioner. Remove the water pump and thermostat housing.');
  A('Externals', 'Remove oil filter, cooler and dipstick tube', 'Remove the oil filter and any oil cooler. Remove the dipstick tube and plug the hole.');
  A('Externals', 'Remove the harmonic balancer', 'Use a puller and never hammer on it. Mark its orientation. Do not pull on the outer ring.');
  A('Externals', 'Remove the clutch or flexplate', 'Mark the flywheel and pressure plate relationship. Use a flywheel lock. Check the ring gear for damaged teeth.');
  A('Top end', 'Set cylinder 1 to TDC and photograph the marks', 'Rotate the crank by hand in its normal direction until cylinder 1 is at TDC on the compression stroke and the timing marks align. Photograph them.', f.has('int') ? 'Interference engine: do not rotate the crank with the timing set removed.' : undefined);
  A('Top end', 'Remove the valve covers', 'Photograph the valvetrain before touching it. Check for sludge and varnish.');
  if (e.valve === 'ohv') A('Top end', 'Remove rocker arms and pushrods in order', 'Loosen evenly. Store each rocker, pivot and pushrod in a labeled rack in the same order they came out.');
  else {
    A('Top end', 'Remove the timing cover', 'Photograph the chain, belt or gears with the marks aligned before removing anything.');
    A('Top end', e.timing === 'belt' ? 'Remove the timing belt' : e.timing === 'gear' ? 'Document and remove the timing gears' : 'Mark and remove the timing chain', e.timing === 'belt' ? 'Mark belt direction. Check tooth wear and tensioner condition.' : e.timing === 'gear' ? 'Photograph the gear marks and check backlash before removal if possible.' : 'Mark chain links to sprocket dots with paint. Release the tensioner and check guides for wear.');
    A('Top end', 'Loosen cam caps and remove camshafts', 'Loosen cam caps evenly in stages from the outside in. Keep caps in order. ' + (f.has('vvt') ? 'Hold the cam on its wrench flats and never use an impact on the phasers.' : ''));
    A('Top end', 'Keep followers and buckets in order', 'Store lifters, buckets or rocker followers in a labeled tray in cylinder order.');
  }
  A('Top end', 'Remove the cylinder heads', 'Loosen head bolts in reverse of the tightening sequence in several stages.' + (f.has('tty') ? ' These are torque-to-yield bolts, so do not reuse them.' : '') + (V ? ' Label each head left or right.' : '') + ' Lift straight up and never pry on the sealing surface.');
  A('Top end', 'Inspect the head gasket and decks', 'Look for burned fire rings, coolant leaks and pitting. Note which cylinder is affected.', 'Photograph the gasket before cleaning.');
  if (e.valve === 'ohv') A('Top end', f.has('dod') ? 'Remove deactivation lifters in order' : 'Remove the lifters in order', f.has('dod') ? 'Keep every lifter and tray together and inspect for collapsed or stuck lifters.' : 'Store lifters in a labeled rack in the same order. Roller lifters have retainers.');
  A('Top end', 'Optional: service the valves', 'Use a valve spring compressor. Keep valves, springs and keepers in labeled trays by position.');
  A('Bottom end', 'Remove the oil pan', 'Turn the engine over. Loosen bolts evenly. The pan flange is thin, so do not pry on it. Look for debris in the pan.' + (f.has('dry') ? ' On a dry sump, remove scavenge lines and label them.' : ''));
  A('Bottom end', 'Remove the oil pump and pickup', 'Keep the pickup tube and screen together. Inspect the screen for metal.');
  if (e.valve === 'ohv') A('Bottom end', 'Remove the timing cover and timing set', 'Photograph the marks before removing the chain or gears. Check chain stretch and gear wear.');
  A('Bottom end', 'Check for a cylinder ridge', 'Feel the top of each bore for a ridge. If present, use a ridge reamer carefully before pushing pistons out.');
  A('Bottom end', 'Remove rod caps and pistons', 'Mark each rod and cap by cylinder and orientation. Keep bearings in order. Push pistons out from below with a wooden hammer handle and reinstall the caps loosely. Note piston orientation marks.');
  A('Bottom end', 'Remove main caps and the crankshaft', 'Mark caps for position and direction. Loosen from the outside in. Lift the crank straight out and keep main bearings in order. Note the thrust bearing location.');
  if (e.valve === 'ohv') A('Bottom end', 'Remove the camshaft', 'Remove the retainer plate, then slide the cam out slowly while supporting the lobes.');
  if (f.has('bal')) A('Bottom end', 'Remove the balance shafts', 'Note the alignment marks and the shaft positions before removal.');
  A('Bottom end', 'Remove freeze plugs and galley plugs', 'Remove core plugs and oil galley plugs so the block can be cleaned thoroughly.');
  A('Inspect', 'Clean and inspect every part', 'Clean with solvent and a soft brush. Do not scrub bearing surfaces. Look for scoring, scuffing, cracks and discoloration.');
  A('Inspect', 'Measure the critical parts', 'Use a dial bore gauge for the cylinders (several heights, two directions), a micrometer for crank journals, and a straightedge and feeler gauges for deck and head flatness. Compare with the factory service manual.');
  A('Inspect', 'Have block and heads crack-checked', 'A machine shop can magnaflux or pressure test the block and heads, and check rod condition.');
  A('Inspect', 'Plan parts and machine work', 'Make a list: gasket set, bearings, rings, seals' + (e.timing === 'belt' ? ', timing belt kit and water pump' : e.timing === 'chain' ? ', timing chain set and guides' : '') + (inj ? ', injector seals' : '') + '. Order after measuring.');
  A('Bag & store', 'Bag, label and store everything', 'Label bags by system and photograph the labeled bags. Coat bare machined surfaces with light oil and cover the block and heads.');
  A('Bag & store', 'Log what you found', 'Write down worn parts, damage and measurements in the project notes while it is fresh.');
  return st;
}
function rotarySteps(e, A, st) {
  A('Externals', 'Remove intake, throttle and exhaust', 'Label every vacuum line and sensor. Photograph the plumbing. Remove the turbo and exhaust if fitted.');
  A('Externals', 'Remove accessories and belt', 'Photograph belt routing first. Remove alternator, AC, power steering and the water pump.');
  A('Externals', 'Remove ignition and injectors', 'Bag and label each coil, plug and injector. Rotaries have leading and trailing plugs.');
  A('Disassembly', 'Remove the flywheel and front cover', 'Mark the flywheel orientation. Remove the front cover and photograph the stationary gears and oil pump.');
  A('Disassembly', 'Mark the housing stack', 'Mark each rotor housing and iron with its position before separating. Use paint or a scribe.');
  A('Disassembly', 'Separate the rotor housings', 'Remove through-bolts evenly. Lift each housing straight off. Photograph the rotor and seals before removing anything.');
  A('Disassembly', 'Remove rotors and eccentric shaft', 'Mark each rotor face and orientation. Keep apex seals, corner seals, springs and side seals in order and orientation.', 'Seals are very easy to mix up. Lay them out on a labeled tray.');
  A('Inspect', 'Inspect and measure', 'Check apex seal height, rotor housing surface, side clearances and the eccentric shaft. Use a rotary-specific service manual for limits.');
  A('Bag & store', 'Bag, label and store everything', 'Label bags by system and photograph the labeled bags. Coat bare machined surfaces with light oil.');
  A('Bag & store', 'Log what you found', 'Write down worn parts, damage and measurements in the project notes.');
  return st;
}

function anglesFor(e) {
  const f = e.flags, inj = ['efi', 'di', 'tbi'].includes(e.fuel), dsl = e.fuel === 'dsl', carb = e.fuel === 'carb', V = /^[VH]/.test(e.cfg);
  const B = [
    { key: 'front', title: 'Front overall', pos: 'front', how: 'Stand about 4 feet from the pulley end. Keep the whole engine in frame, straight on, with good light.' },
    { key: 'left', title: 'Driver side overall', pos: 'left', how: 'Step back so the full side is in frame. Keep the camera level at mid-engine height.' },
    { key: 'right', title: 'Passenger side overall', pos: 'right', how: 'Same distance and height as the driver side so you can compare the two.' },
    { key: 'rear', title: 'Rear overall', pos: 'rear', how: 'Shoot from the bellhousing end. Show the firewall side plumbing and the back of the heads.' },
    { key: 'top', title: 'Top-down overall', pos: 'top', how: 'Stand over the engine and shoot straight down. Hold the phone parallel to the engine.' },
    { key: 'belt', title: 'Belt routing', pos: 'front', how: 'Photograph the accessory belt path from the front. Take a second shot showing the tensioner position.' },
    { key: 'cooling', title: 'Coolant hoses', pos: 'detail', how: 'Capture each hose at the water pump, thermostat housing, radiator and heater connections.' },
  ];
  if (carb) B.push({ key: 'carb', title: 'Carburetor and linkage', pos: 'detail', how: 'Close-up of the throttle and choke linkage, return springs and cable routing from two angles.' }, { key: 'vac', title: 'Vacuum lines', pos: 'detail', how: 'Photograph every vacuum line and where it connects. Take extra close-ups of the ports.' });
  if (inj || dsl) B.push({ key: 'harness', title: 'Wiring harness routing', pos: 'top', how: 'Take overlapping shots of the harness path across the engine.' }, { key: 'connectors', title: 'Connectors close-up', pos: 'detail', how: 'Photograph each connector and what it plugs into. Add label tape before unplugging.' }, { key: 'vac', title: 'Vacuum and PCV lines', pos: 'detail', how: 'Photograph vacuum, PCV, EVAP and brake booster lines and their ports.' });
  if (inj) B.push({ key: 'fuel', title: 'Fuel rail and lines', pos: 'detail', how: 'Show the fuel rail, line routing and injector connectors from above and from the side.' });
  if (dsl) B.push({ key: 'injlines', title: 'Injector lines and rail', pos: 'detail', how: 'Photograph the high-pressure lines, rail and injector connections from two angles.' });
  if (e.boost) B.push({ key: 'turbo', title: 'Turbo and intercooler piping', pos: 'detail', how: 'Follow the charge path and shoot each connection and clamp.' }, { key: 'turbolines', title: 'Turbo oil and coolant lines', pos: 'detail', how: 'Photograph feed and return lines, banjo bolts and where each one goes.' });
  if (f.has('dist')) B.push({ key: 'dist', title: 'Distributor and plug wires', pos: 'detail', how: 'Show the rotor position and which cylinder each plug wire serves. Add tape flags with cylinder numbers.' });
  else if (!dsl) B.push({ key: 'coils', title: 'Coils and ignition connectors', pos: 'detail', how: 'Photograph coil positions, connectors and plug wire routing if present.' });
  B.push({ key: 'exh', title: 'Exhaust manifold connections', pos: 'detail', how: 'Show the manifold-to-head connection, studs, heat shields and brackets on both sides.' }, { key: 'bell', title: 'Bellhousing and flywheel', pos: 'rear', how: 'Show the bellhousing, dowel positions and any visible flywheel or flexplate markings.' }, { key: 'tags', title: 'Cylinder numbers and ID tags', pos: 'detail', how: 'Photograph the casting numbers, ID plate, cylinder numbering and any stamped codes.' });
  const D = [
    { key: 'tdc', title: 'TDC and timing marks', pos: 'front', how: 'Rotate to cylinder 1 TDC. Photograph the crank pulley mark and the timing cover pointer.' },
    { key: 'valvetrain', title: 'Valvetrain layout', pos: 'top', how: 'With the covers off, show the whole valvetrain from above.' },
    { key: 'timingset', title: 'Timing set with marks aligned', pos: 'detail', how: 'Close-up of chain, belt or gear marks before removal. Take two angles.' },
    { key: 'gasket', title: 'Head gasket and deck', pos: 'top', how: 'Photograph the head gasket and deck surface after the heads come off.' },
    { key: 'pistons', title: 'Piston crowns', pos: 'top', how: 'Photograph each piston crown, showing carbon pattern and any marks.' },
    { key: 'pan', title: 'Oil pan and debris', pos: 'bottom', how: 'Show the inside of the pan and anything collected in it.' },
    { key: 'caps', title: 'Rod and main cap markings', pos: 'detail', how: 'Show the cylinder numbers and cap orientation marks before removal.' },
    { key: 'bearings', title: 'Bearing wear', pos: 'detail', how: 'Lay bearings out in order and photograph them under bright light.' },
    { key: 'crank', title: 'Crankshaft journals', pos: 'detail', how: 'Photograph each journal and thrust surface. Use raking light to show scoring.' },
  ];
  return { before: B, during: D };
}

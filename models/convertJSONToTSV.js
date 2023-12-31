//should take a JSON object and convert it to TSV where each line is a system
//JSON looks like this
/**
 * {
	"0": {
		"gsp": "TTT 0210 1K160.56 0ATD00G0DD",
		"domain": "T",
		"sector": "T",
		"subsector": "T",
		"column": "02",
		"row": "10",
		"system": {
			"domain": "T",
			"sector": "T",
			"subsector": "T",
			"column": "02",
			"row": "10",
			"_id": "6516b9e264933a69716243f1",
			"numberOfStars": 1,
			"primaryStarType": "K",
			"baseMass": "0.8",
			"starProgress": "1",
			"starLuminosity": "6",
			"starClassification": "Sub-Dwarf",
			"starMass": "0.56",
			"zoneNear": "0",
			"zoneInner": "A",
			"zoneHabitable": "T",
			"zoneOuter1": "D",
			"zoneOuter2": "0",
			"zoneOuter3": "0",
			"zoneFar1": "G",
			"zoneFar2": "0",
			"zoneFar3": "D",
			"zoneFar4": "D",
			"zones": {
				"near": "0",
				"inner": {
					"A": {
						"Distance": "0.05 au",
						"Size": "Huge",
						"Density": "Dense",
						"Resources": "None"
					}
				},
				"habitable": {
					"T": {
						"Distance": "0.04 au",
						"Gravity": "0.60g",
						"Diameter": "1.24",
						"Mass": "0.93",
						"Rings": false,
						"Habitable": false,
						"Dominate Life Form": "None",
						"Atmospheric Pressure": "Standard",
						"Atmospheric Toxicity": "Moderate Hazard",
						"Hydrosphere": 79,
						"Hydrosphere Composition": "liquid water, and frozen poles",
						"Radiation Level": "",
						"Dominant Terrain": "Tundra, Glacier",
						"Axial Tilt": 38,
						"Length of Day": "Slow length of day (56.7 hours)",
						"Length of Year": "Slow (654 days)",
						"Resources": {
							"Type": "Metal Ore (high-grade)",
							"Amount": 10000,
							"Value": 70,
							"Resource": "Antimony"
						},
						"Feature": "None",
						"Moons": {
							"0": {
								"Size": "Medium",
								"Gravity": "0.205g",
								"Diameter": "6.010",
								"Mass": "7.396",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 93,
								"Hydrosphere Composition": "liquid water, and frozen poles",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Forest, Woods",
								"Axial Tilt": -8,
								"Length of Day": "Very slow length of day (63.6 hours)",
								"Length of Year": "Typical (395 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"1": {
								"Size": "Tiny",
								"Gravity": "0.076g",
								"Diameter": "0.009",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 60,
								"Hydrosphere Composition": "liquid water, and frozen poles",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Hills, Steppes, Slopes",
								"Axial Tilt": 8,
								"Length of Day": "Very fast length of day (1.6 hours)",
								"Length of Year": "Fast (146 days)",
								"Resources": {
									"Type": "Precious Metal(s)",
									"Amount": 5,
									"Value": 250,
									"Resource": "Silver"
								},
								"Feature": "None"
							}
						}
					}
				},
				"outer1": {
					"D": {
						"Distance": "0.02 au",
						"Gravity": "2.93g",
						"Diameter": "0.51",
						"Mass": "0.76",
						"Rings": false,
						"Habitable": false,
						"Dominate Life Form": "None",
						"Atmospheric Pressure": "Thin",
						"Atmospheric Toxicity": "Normal, no hazard",
						"Hydrosphere": 9,
						"Hydrosphere Composition": "mostly frozen water",
						"Surface Temperature": "Moderate",
						"Radiation Level": "Low",
						"Dominant Terrain": "Tundra, Glacier",
						"Axial Tilt": 15,
						"Length of Day": "Very fast length of day (5.5 hours)",
						"Length of Year": "Slow (797 days)",
						"Resources": "None",
						"Feature": "None",
						"Moons": {
							"0": {
								"Size": "Tiny",
								"Gravity": "0.026g",
								"Diameter": "0.007",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 90,
								"Hydrosphere Composition": "mostly frozen water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Tundra, Glacier",
								"Axial Tilt": -17,
								"Length of Day": "Typical length of day (19.5 hours)",
								"Length of Year": "Slow (563 days)",
								"Resources": "None",
								"Feature": "None"
							}
						}
					}
				},
				"outer2": "0",
				"outer3": "0",
				"far1": {
					"I": {
						"Distance": "0.05 au",
						"Gravity": "1.70g",
						"Diameter": "10.75",
						"Mass": "196.46",
						"Rings": false,
						"Details": {
							"Core": "Small iron core enriched with gold, platinum, and other iron-loving elements",
							"Fuel Rating": "High fuel rating, 2x refuel rate",
							"Main Gases": "Water 10%, Ammonia 30%, Methane 60%",
							"Trace Gases": "Water, Ammonia"
						},
						"Moons": {
							"0": {
								"Size": "Small",
								"Gravity": "0.203g",
								"Diameter": "2.005",
								"Mass": "0.814",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Standard",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 60,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 47,
								"Length of Day": "Typical length of day (24.1 hours)",
								"Length of Year": "Slow (826 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"1": {
								"Size": "Medium",
								"Gravity": "0.405g",
								"Diameter": "6.010",
								"Mass": "14.620",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 1,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 19,
								"Length of Day": "Typical length of day (29.2 hours)",
								"Length of Year": "Slow (737 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"2": {
								"Size": "Large",
								"Gravity": "0.100g",
								"Diameter": "3.015",
								"Mass": "0.909",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Standard",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 71,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 7,
								"Length of Day": "Slow length of day (41.6 hours)",
								"Length of Year": "Slow (656 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"3": {
								"Size": "Tiny",
								"Gravity": "0.056g",
								"Diameter": "0.004",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Severe Hazard",
								"Hydrosphere": 13,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 8,
								"Length of Day": "Typical length of day (21.9 hours)",
								"Length of Year": "Slow (539 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"4": {
								"Size": "Small",
								"Gravity": "0.022g",
								"Diameter": "10.005",
								"Mass": "2.252",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 21,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -7,
								"Length of Day": "Fast length of day (11.9 hours)",
								"Length of Year": "Slow (637 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"5": {
								"Size": "Large",
								"Gravity": "0.530g",
								"Diameter": "9.015",
								"Mass": "43.073",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 37,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 44,
								"Length of Day": "Fast length of day (10.2 hours)",
								"Length of Year": "Slow (791 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"6": {
								"Size": "Medium",
								"Gravity": "0.005g",
								"Diameter": "2.010",
								"Mass": "0.019",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 15,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 46,
								"Length of Day": "Typical length of day (23.6 hours)",
								"Length of Year": "Slow (601 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"7": {
								"Size": "Huge",
								"Gravity": "0.360g",
								"Diameter": "8.020",
								"Mass": "23.155",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 43,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -21,
								"Length of Day": "Very fast length of day (5.6 hours)",
								"Length of Year": "Slow (999 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"8": {
								"Size": "Medium",
								"Gravity": "0.310g",
								"Diameter": "7.010",
								"Mass": "15.210",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 25,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -7,
								"Length of Day": "Typical length of day (28.7 hours)",
								"Length of Year": "Slow (794 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"9": {
								"Size": "Tiny",
								"Gravity": "0.006g",
								"Diameter": "0.004",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 43,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 3,
								"Length of Day": "Typical length of day (19.2 hours)",
								"Length of Year": "Slow (887 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"10": {
								"Size": "Medium",
								"Gravity": "0.390g",
								"Diameter": "3.010",
								"Mass": "3.538",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 63,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -30,
								"Length of Day": "Typical length of day (24.0 hours)",
								"Length of Year": "Slow (896 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"11": {
								"Size": "Small",
								"Gravity": "0.075g",
								"Diameter": "10.005",
								"Mass": "7.508",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Moderate Hazard",
								"Hydrosphere": 42,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -33,
								"Length of Day": "Typical length of day (21.7 hours)",
								"Length of Year": "Slow (528 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"12": {
								"Size": "Tiny",
								"Gravity": "0.107g",
								"Diameter": "0.001",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 24,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 46,
								"Length of Day": "Typical length of day (21.9 hours)",
								"Length of Year": "Slow (543 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"13": {
								"Size": "Medium",
								"Gravity": "0.443g",
								"Diameter": "7.010",
								"Mass": "21.762",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 5,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 28,
								"Length of Day": "Typical length of day (18.6 hours)",
								"Length of Year": "Slow (574 days)",
								"Resources": {
									"Type": "Precious Metal(s)",
									"Amount": 68,
									"Value": 300,
									"Resource": "Gold"
								},
								"Feature": "None"
							},
							"14": {
								"Size": "Huge",
								"Gravity": "1.760g",
								"Diameter": "2.020",
								"Mass": "7.182",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 63,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -36,
								"Length of Day": "Typical length of day (27.9 hours)",
								"Length of Year": "Slow (703 days)",
								"Resources": {
									"Type": "Raw crystals",
									"Amount": 200,
									"Value": 33,
									"Resource": "Hematite"
								},
								"Feature": "None"
							},
							"15": {
								"Size": "Small",
								"Gravity": "0.250g",
								"Diameter": "10.005",
								"Mass": "25.025",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Moderate Hazard",
								"Hydrosphere": 100,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 45,
								"Length of Day": "Typical length of day (15.2 hours)",
								"Length of Year": "Slow (907 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"16": {
								"Size": "Large",
								"Gravity": "0.240g",
								"Diameter": "6.015",
								"Mass": "8.683",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Standard",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 93,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -34,
								"Length of Day": "Slow length of day (36.6 hours)",
								"Length of Year": "Slow (641 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"17": {
								"Size": "Medium",
								"Gravity": "0.333g",
								"Diameter": "10.010",
								"Mass": "33.400",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 6,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 37,
								"Length of Day": "Very slow length of day (73.2 hours)",
								"Length of Year": "Slow (641 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"18": {
								"Size": "Tiny",
								"Gravity": "0.004g",
								"Diameter": "0.003",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 88,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 42,
								"Length of Day": "Typical length of day (29.4 hours)",
								"Length of Year": "Slow (504 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"19": {
								"Size": "Huge",
								"Gravity": "0.500g",
								"Diameter": "2.020",
								"Mass": "2.040",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 11,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -45,
								"Length of Day": "Slow length of day (33.2 hours)",
								"Length of Year": "Slow (995 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"20": {
								"Size": "Medium",
								"Gravity": "0.033g",
								"Diameter": "9.010",
								"Mass": "2.706",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Mild Hazard",
								"Hydrosphere": 72,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 17,
								"Length of Day": "Fast length of day (7.9 hours)",
								"Length of Year": "Slow (767 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"21": {
								"Size": "Small",
								"Gravity": "0.105g",
								"Diameter": "6.005",
								"Mass": "3.786",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 97,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 22,
								"Length of Day": "Typical length of day (20.3 hours)",
								"Length of Year": "Slow (641 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"22": {
								"Size": "Tiny",
								"Gravity": "0.036g",
								"Diameter": "0.001",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Thin",
								"Atmospheric Toxicity": "Moderate Hazard",
								"Hydrosphere": 91,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -6,
								"Length of Day": "Fast length of day (14.0 hours)",
								"Length of Year": "Slow (883 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"23": {
								"Size": "Huge",
								"Gravity": "0.960g",
								"Diameter": "9.020",
								"Mass": "78.106",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Mild Hazard",
								"Hydrosphere": 84,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 16,
								"Length of Day": "Very slow length of day (87.1 hours)",
								"Length of Year": "Slow (698 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"24": {
								"Size": "Tiny",
								"Gravity": "0.064g",
								"Diameter": "0.007",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Severe Hazard",
								"Hydrosphere": 82,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -46,
								"Length of Day": "Typical length of day (27.9 hours)",
								"Length of Year": "Slow (531 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"25": {
								"Size": "Tiny",
								"Gravity": "0.046g",
								"Diameter": "0.008",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 5,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 5,
								"Length of Day": "Typical length of day (26.8 hours)",
								"Length of Year": "Slow (519 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"26": {
								"Size": "Tiny",
								"Gravity": "0.074g",
								"Diameter": "0.002",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 26,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 47,
								"Length of Day": "Typical length of day (28.0 hours)",
								"Length of Year": "Slow (869 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"27": {
								"Size": "Small",
								"Gravity": "0.250g",
								"Diameter": "9.005",
								"Mass": "20.273",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Severe Hazard",
								"Hydrosphere": 87,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -26,
								"Length of Day": "Fast length of day (12.9 hours)",
								"Length of Year": "Slow (756 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"28": {
								"Size": "Tiny",
								"Gravity": "0.077g",
								"Diameter": "0.005",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 30,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -48,
								"Length of Day": "Typical length of day (19.2 hours)",
								"Length of Year": "Slow (654 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"29": {
								"Size": "Medium",
								"Gravity": "0.424g",
								"Diameter": "10.010",
								"Mass": "42.466",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 98,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -48,
								"Length of Day": "Slow length of day (51.0 hours)",
								"Length of Year": "Slow (972 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"30": {
								"Size": "Small",
								"Gravity": "0.005g",
								"Diameter": "5.005",
								"Mass": "0.125",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 77,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -45,
								"Length of Day": "Typical length of day (18.3 hours)",
								"Length of Year": "Slow (757 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"31": {
								"Size": "Large",
								"Gravity": "0.960g",
								"Diameter": "8.015",
								"Mass": "61.671",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 75,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Low",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -7,
								"Length of Day": "Typical length of day (22.4 hours)",
								"Length of Year": "Slow (749 days)",
								"Resources": {
									"Type": "Raw crystals",
									"Amount": 175,
									"Value": 97,
									"Resource": "Fluorite"
								},
								"Feature": "None"
							}
						}
					}
				},
				"far2": "0",
				"far3": {
					"D": {
						"Distance": "0.04 au",
						"Gravity": "0.07g",
						"Diameter": "0.17",
						"Mass": "0.00",
						"Rings": false,
						"Habitable": false,
						"Dominate Life Form": "None",
						"Atmospheric Pressure": "Very Thin",
						"Atmospheric Toxicity": "Mild Hazard",
						"Hydrosphere": 89,
						"Hydrosphere Composition": "sub-glacial water",
						"Surface Temperature": "Frozen",
						"Radiation Level": "Minor",
						"Dominant Terrain": "Ice",
						"Axial Tilt": -10,
						"Length of Day": "Typical length of day (27.7 hours)",
						"Length of Year": "Fast (170 days)",
						"Resources": "None",
						"Feature": "None",
						"Moons": {
							"0": {
								"Size": "Small",
								"Gravity": "0.107g",
								"Diameter": "9.005",
								"Mass": "8.717",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 43,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Cold",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -9,
								"Length of Day": "Slow length of day (51.4 hours)",
								"Length of Year": "Slow (825 days)",
								"Resources": {
									"Type": "Silicates (no mineral value)",
									"Amount": 5,
									"Value": 3,
									"Resource": ""
								},
								"Feature": "None"
							},
							"1": {
								"Size": "Huge",
								"Gravity": "1.580g",
								"Diameter": "10.020",
								"Mass": "158.633",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 54,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Moderate",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": -23,
								"Length of Day": "Typical length of day (25.6 hours)",
								"Length of Year": "Slow (960 days)",
								"Resources": "None",
								"Feature": "None"
							},
							"2": {
								"Size": "Small",
								"Gravity": "0.172g",
								"Diameter": "3.005",
								"Mass": "1.558",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Dense",
								"Atmospheric Toxicity": "Trace Hazard",
								"Hydrosphere": 74,
								"Hydrosphere Composition": "sub-glacial water",
								"Surface Temperature": "Cold",
								"Radiation Level": "Minor",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 25,
								"Length of Day": "Very fast length of day (5.3 hours)",
								"Length of Year": "Slow (561 days)",
								"Resources": "None",
								"Feature": "None"
							}
						}
					}
				},
				"far4": {
					"D": {
						"Distance": "0.04 au",
						"Gravity": "2.87g",
						"Diameter": "0.24",
						"Mass": "0.17",
						"Rings": false,
						"Habitable": false,
						"Dominate Life Form": "None",
						"Atmospheric Pressure": "Very Thin",
						"Atmospheric Toxicity": "Trace Hazard",
						"Hydrosphere": 83,
						"Hydrosphere Composition": "sub-glacial water",
						"Radiation Level": "",
						"Dominant Terrain": "Ice",
						"Axial Tilt": 38,
						"Length of Day": "Slow length of day (46.0 hours)",
						"Length of Year": "",
						"Resources": {
							"Type": "Radioactive Ore",
							"Amount": 700,
							"Value": 57,
							"Resource": "Chalcolite"
						},
						"Feature": "None",
						"Moons": {
							"0": {
								"Size": "Tiny",
								"Gravity": "0.114g",
								"Diameter": "0.007",
								"Mass": "0.000",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 46,
								"Hydrosphere Composition": "sub-glacial water",
								"Radiation Level": "",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 14,
								"Length of Day": "Typical length of day (16.0 hours)",
								"Length of Year": "",
								"Resources": "None",
								"Feature": "None"
							},
							"1": {
								"Size": "Small",
								"Gravity": "0.228g",
								"Diameter": "1.005",
								"Mass": "0.230",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Thin",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 50,
								"Hydrosphere Composition": "sub-glacial water",
								"Radiation Level": "",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 15,
								"Length of Day": "Typical length of day (25.2 hours)",
								"Length of Year": "",
								"Resources": {
									"Type": "Metal Ore (low-grade)",
									"Amount": 13,
									"Value": 11,
									"Resource": "Zinc"
								},
								"Feature": "None"
							},
							"2": {
								"Size": "Medium",
								"Gravity": "0.324g",
								"Diameter": "4.010",
								"Mass": "5.207",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Standard",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 17,
								"Hydrosphere Composition": "sub-glacial water",
								"Radiation Level": "",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 36,
								"Length of Day": "Slow length of day (46.5 hours)",
								"Length of Year": "",
								"Resources": "None",
								"Feature": "None"
							},
							"3": {
								"Size": "Huge",
								"Gravity": "0.960g",
								"Diameter": "10.020",
								"Mass": "96.384",
								"Habitable": false,
								"Dominate Life Form": "None",
								"Atmospheric Pressure": "Very Dense",
								"Atmospheric Toxicity": "Normal, no hazard",
								"Hydrosphere": 35,
								"Hydrosphere Composition": "sub-glacial water",
								"Radiation Level": "",
								"Dominant Terrain": "Ice",
								"Axial Tilt": 16,
								"Length of Day": "Typical length of day (19.5 hours)",
								"Length of Year": "",
								"Resources": "None",
								"Feature": "None"
							}
						}
					}
				}
			},
			"gsp": "TTT 0210 1K160.56 0ATD00G0DD"
		}
	},
 */
const jsonToTsv = {
    convert: function(json) {
        let tsv = "";
        let keys = Object.keys(json);
        let values = Object.values(json);
        let i = 0;
        for (const key of keys) {
            if (typeof values[i] === "object") {
                tsv += key + "\t" + jsonToTsv.convert(values[i]);
            } else {
                tsv += key + "\t" + values[i];
            }
            tsv += "\n";
            i++;
        }
        return tsv;
    }


}; 
module.exports = jsonToTsv;
const express = require('express');

const Epanpan = require('../models/epanpan.js');

// Initialize app
const router = express.Router();

// Get the latest updated epanpan data
router.get('/', async function (req, res) {
  try {
    const latestEpanpan = await Epanpan.findOne().sort('-lastUpdated');
    res.json(latestEpanpan);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Increment hunger by 1
// router.post('/hunger', async function (req, res) {
//     try {
//         const latestEpanpan = await Epanpan.findOne().sort('-lastUpdated');

//         if (latestEpanpan.hunger >= 10){
//             res.status(400).json({ message: `Can't increase hunger anymore` });
//             return;
//         }

//         latestEpanpan.hunger += 1;
//         latestEpanpan.lastUpdated = new Date();
//         const savedEpanpan = await latestEpanpan.save();
//         res.json(savedEpanpan);
//       } catch (err) {
//         console.error(err);
//         res.sendStatus(500);
//       }
//   });

  router.post('/hunger', async function (req, res) {
    try {
      const latestEpanpan = await Epanpan.findOne().sort('-lastUpdated');
  
      let newEpanpan;
      if (latestEpanpan && latestEpanpan.hunger < 10) {
        // If a latest record exists and hunger is less than 10, update it
        latestEpanpan.hunger += 1;
        latestEpanpan.lastUpdated = new Date();
        newEpanpan = await latestEpanpan.save();
      } else {
        // If no latest record exists, or hunger is already 10, create a new record
        newEpanpan = await Epanpan.create({
          name: "New Epanpan",
          hunger: 7,
          happiness: 7,
          energy: 7,
          cleanliness: 7,
          lastUpdated: new Date(),
          lastCarer: "Unknown"
        });
      }
  
      res.json(newEpanpan);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  
  

module.exports = router;



// // Increment a field of the epanpan by 1
// router.post('/:field', async function (req, res) {
//   const field = req.params.field;
//   const update = {};
//   let maxLimit = 10;

//   // set field limit and update object based on the request parameter
//   switch (field) {
//     case 'hunger':
//       maxLimit = 10;
//       update.hunger = 1;
//       break;
//     case 'happiness':
//       maxLimit = 10;
//       update.happiness = 1;
//       break;
//     case 'energy':
//       maxLimit = 10;
//       update.energy = 1;
//       break;
//     case 'cleanliness':
//       maxLimit = 10;
//       update.cleanliness = 1;
//       break;
//     default:
//       res.status(400).json({ message: "Invalid field" });
//       return;
//   }

//   try {
//     const latestEpanpan = await Epanpan.findOne().sort('-lastUpdated');

//     // check if the field is already at the max limit
//     if (latestEpanpan[field] === maxLimit) {
//       res.status(400).json({ message: `Can't increase ${field} anymore` });
//       return;
//     }

//     // increment the specified field by 1 and save the updated epanpan object
//     latestEpanpan[field] += 1;
//     latestEpanpan.lastUpdated = new Date();
//     const updatedEpanpan = await latestEpanpan.save();
//     res.json(updatedEpanpan);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });

module.exports = router;

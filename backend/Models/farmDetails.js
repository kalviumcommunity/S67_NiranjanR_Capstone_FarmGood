const mongoose = require('mongoose');

const farmDetailsSchema = new mongoose.Schema({
    soilType: {
        type:String,
        enum:['Sandy', 'Clay', 'Silty', 'Loamy', 'Peaty', 'Chalky', 'Saline', 'Laterite', 'Black Cotton Soil', 'Red Soil'],
        required:true,
    },
    phLevel: {
        type:Number,
        min: [0, 'pH must be at least 0'],
        max: [14, 'pH cannot exceed 14']
    },
    area:{
        type:Number,
        required:true
    },
    moisture: {
        type:Number,
        min:0,
        max:100,
        required:true,
    },
    location: {
      lat:{
        type:Number,
        required:true
      },
      lon:{
        type:Number,
        required:true
      }
    },
    NPK:{
        Nitrogen:{
            type:Number,
            required:true,
        },
        Phosphorus:{
            type:Number,
            required:true,
        },
        Potassium:{
            type:Number,
            required:true,
        }
    },
    organicCarbon:{
        type:Number,
        min:0,
        max:100,
    },
    drainage:{
        type:String,
        enum:['Well','Moderate','Poor'],
        required:true,
    }

  });
  
  module.exports = farmDetailsSchema;
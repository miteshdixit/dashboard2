const JsonData = require("../models/dataSchema");


 const FetchData = async (req, res) => {
    try {
        const data = await JsonData.find();
        res.json(
        {   
            success: true,
           message: "json data sended",
           data
           
        }
           );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = FetchData;
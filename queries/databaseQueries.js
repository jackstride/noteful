const findAll = (req, res, next, table, params) => {
let results = table.find({params})
results 
? res.status(200).json(doc) 
: next(createError(409, "There was a problem fetching folders"))
}



module.exports = {
    findAll,
}
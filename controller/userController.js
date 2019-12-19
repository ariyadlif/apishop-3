const User = require('../models/user')

exports.home = (req,res) => {
	res.send("Wellcome to API Shop")
}

exports.listUser = async (req,res) => {
	let data = await User.find()
	res.send(JSON.stringify({ "status" : 200, "error" : null, "response" : data}))
}

exports.detailUser = async (req,res) => {
	const data = await User.findById(req.params.id)
	res.send(JSON.stringify({ "status" : 200, "error" : null, "response" : data}))
}

exports.tambahUser = async (req,res) => {
	const users = new User(req.body)
	const status = await users.save()
	res.send(JSON.stringify({ "status" : 200, "error" : null, "response" : status}))
}

exports.ubahUser = async (req,res) => {
	const {id} = req.params
	const status = await User.update({_id : id}, req.body)
	res.send(JSON.stringify({ "status" : 200, "error" : null, "response" : status}))
}

exports.hapusUser = async (req,res) => {
	const {id} = req.params
	const status = await User.remove({_id : id})
	res.send(JSON.stringify({ "status" : 200, "error" : null, "response" : status}))
}
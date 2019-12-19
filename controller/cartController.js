const Cart = require('../models/cart')
const Product = require('../models/product')

const showDataCart = async (idUser) => {
	const data = await Cart.find({userCart : idUser}).populate('productCart').lean()
	data.forEach(row => {
		row.subTotal = Number.parseInt(row.productCart.price) * row.qtyCart
	})
	return data
}

exports.showCart = async (req,res) => {
	const idUser = req.params.id
	const data = await showDataCart(idUser)
	res.send(JSON.stringify({"status" : 200, "error" : null, "response" : data}))
}

exports.editCart = async (req,res) => {
	const userCart = req.params.id
	const productCart = req.body.productCart
	const qty = Number.parseInt(req.body.qtyCart)
	if (qty > 0) {
		const dataCart = await Cart.findOneAndUpdate({userCart : userCart, productCart : productCart},{qtyCart : qty})
	}else if(qty <= 0){
		const deleteCart = await Cart.findOneAndUpdate({userCart : userCart, productCart : productCart})
	}
	const data = await showDataCart(userCart)
	res.send(JSON.stringify({"status" : 200, "error" : null, "response" : data}))
}

exports.deleteCart = async (req,res) => {
	const userCart = req.params.id
	const productCart = req.body.productCart
	const deleteCart = await Cart.findOneAndDelete({userCart : userCart, productCart : productCart})
	const data = await showDataCart(userCart)
	res.send(JSON.stringify({"status" : 200, "error" : null, "response" : data}))
}

exports.removeCart = async (req,res) => {
	const userCart = req.params.id
	const hapusCart = await Cart.deleteMany({userCart : userCart})
	res.send(JSON.stringify({"status" : 200, "error" : null, "response" : "Cart terhapus"}))
}

exports.addToCart = async (req,res) => {
	const userCart = req.params.id
	const productCart = req.body.productCart
	const qty = Number.parseInt(req.body.qtyCart)

	const dataCart = await Cart.count({userCart : userCart, productCart : productCart})
	if (dataCart == 0) {
		const data = {
			productCart : productCart,
			qtyCart : qty,
			userCart : userCart
		}
		console.log(data)
		const carts = new Cart(data)
		const saveCart = await carts.save()
		res.send(JSON.stringify({"status" : 200, "error" : null, "response" : "berhasil menambahkan ke cart"}))
	}else{
		const dataCart = await Cart.find({userCart : userCart, productCart : productCart}).lean()
		dataCart.forEach(async row => {
			const newQty = Number.parseInt(row.qtyCart) + qty
			const updateCart = await Cart.updateOne({_id : row._id}, {qtyCart : newQty})
		})
		res.send(JSON.stringify({"status" : 200, "error" : null, "response" : "Berhasil menambahkan ke cart"}))
	}
}
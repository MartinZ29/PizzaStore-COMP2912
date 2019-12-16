var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');

const pizza = require('../public/pizzaprice');
const Calculator = require('../models/calculator');
const Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pizza Store', pizza: pizza });
});

/* GET order page. */
router.get('/orders', function(req, res, next) {
  res.render('orders', { title: 'Order listing' });
});


/* API methods */
router.post('/api/orders',[
  check('customerName').not().isEmpty(),
  check('phoneNumber').not().isEmpty(),
  check('address').not().isEmpty()
], (req, res)=> {
  const errors = validationResult(req);
 	 if (!errors.isEmpty()) {
   	 	return res.status(422).json({ errors: errors.array() });
  	}

  //Validation logic
  // if (!req.body.title || !req.body.description || !req.body.courseNo) {
  //   console.log("Invalid course information");
  //   return res.status(400).json({msg : "Invalid course information"});
  // }

  let orderInfo = req.body;
  let calculator = new Calculator(orderInfo.pizzaSize,orderInfo.toppings.length,orderInfo.quantity)
  let subtotal = calculator.subtotal().toFixed(2);
  let tax = calculator.tax().toFixed(2);
  let total = calculator.total().toFixed(2);
  orderInfo.price = total;

  order = new Order(orderInfo);

  console.log(orderInfo);

  order.save((err)=> {
      if (err) {
        console.log(err);          
        res.status(500).json({msg : "Error adding the order"});
        return;
      }
      res.json({status : "Successfully added a order"})
  });
});

router.get('/api/orders', (req, res)=> {
  Order.find({}, (err, orders)=> {
    if (err) {
      console.log(err);          
      res.status(500).json({msg : "Error retrieving orders"});
      return;
    }
    res.json(orders);
  });
});

router.get('/api/orders/:searchName', (req,res) => {
  var name = req.params.searchName;
  Order.find({customerName:name}, (err, result)=> {
    if (err) {
      console.log(err);          
      res.status(500).json({msg : "Error retrieving orders"});
      return;
    }
    console.log(result);
    res.json(result);
  })
})

router.get('/api/orders/phone/:searchPhone', (req,res) => {
  var phone = req.params.searchPhone;
  Order.find({phoneNumber:phone}, (err, result)=> {
    if (err) {
      console.log(err);          
      res.status(500).json({msg : "Error retrieving orders"});
      return;
    }
    console.log(result);
    res.json(result);
  })
})

module.exports = router;

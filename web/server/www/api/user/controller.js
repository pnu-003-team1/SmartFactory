/*
 * index(): GET /users
 * show(): GET /usres/:id
 * delete(): DELETE /users/:id
 * create(): POST /join
 * login(): POST/login
 */
//req: 클라이언트로부터 넘어온 데이터 저장된 객체
//res: 클라이언트로 결과를 넘겨주기 위한 객체

const router = require('express').Router();
const User = require('../../models/user');

exports.index = (req, res) => {
	console.log(req.params.id);
	const id = parseInt(req.params.id, 10);
	
	if(!id) { // id == NaN, id 숫자인지 검증
		return res.status(400).json({error: 'Incorrect Id'});
	}
	
	let user = users.filter(user => user.id === id)[0]
	
	if (!user) {
		return res.status(404).json({error: 'Unknown user'});
	}
	console.log('user:' + user);
	
	return res.json(user);
};

exports.show = (req, res) => {
	return res.json(users);
};

exports.delete = (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (!id) {
		return res.status(400).json({error: 'Incorrect Id'});
	}
	
	const userIdx = users.findIndex(user => {
		return user.id === id;
	});
	if(userIdx === -1) {
		return res.status(404).json({error: 'Unknown user'});
	}
	
	users.splice(userIdx, 1); // 1번째 파라매터 포함해 1개 삭제
	
	res.status(204).send(); // No Content
};

exports.create = (req, res) => {
	const name = req.body.name; // undefined 시  ''
	const email = req.body.email;
	const pw = req.body.pw;
	const phone = req.body.phone;
	
	if (!name.length) {
		return res.status(400).json({error: 'name length 0'});
	}
	
	if (!email.length) {
		return res.status(400).json({error: 'email length 0'});
	}
	
	if (!pw.length) {
		return res.status(400).json({error: 'pw length 0'});
	}
	
	if (!phone.length) {
		return res.status(400).json({error: 'phone length 0'});
	}
	
	User.add(req.body)
		.then(user => res.send(user))
		.catch(err => res.status(400).send({error: 'fail to add'}));
};


exports.login = (req, res) => {
	const email = req.body.email;
	const pw = req.body.pw;
	
	if (!email.length) {
		return res.status(400).json({error: 'email length 0'});
	}
	
	if (!pw.length) {
		return res.status(400).json({error: 'pw length 0'});
	}
	
	User.userlogin(req.body.email,req.body.pw)
		.then((user) => {
      if (user.length < 1){
      	return res.status(400).send({ error: 'User not found' });
      }
      else {
      	return res.status(200).send();
      }
    })
    .catch(err => res.status(500).send(err));
    
};


exports.checkRep = (req, res) => {
	const email = req.body.email;
	
	if (!email.length) {
		return res.status(400).json({error: 'email length 0'});
	}
	
	User.checkid(req.body.email)
		.then((user) => {
			console.log("result len", user.length);
      if (user.length < 1) return res.status(200).send();
      else res.status(400).send({error: 'email repetition'});
    })
    .catch(err => res.status(500).send({error: 'server error'}));
};
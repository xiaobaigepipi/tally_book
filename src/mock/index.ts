// import mock from 'better-mock/dist/mock.mp'
import mock from 'better-mock'
mock.mock('/api/mock/test','GET',{
	"code": 1,
	"message": "success",
	'data|1-10':[{
		'id|+1':1,
		'name':'@name',
	}]
})


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	config.headers.token = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")).token : '';
	config.headers['Content-Type'] = 'application/json';
	console.log("token:", config.headers.token)
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	console.log(response);
	return response;
}, function (error) {
	console.log(error.response);
	var response = error.response;
	if (response) {
		// if (response.status === 401) {
		// 	window.location.href = "./login.html";
		// } else {
			console.log(response);
		// }

	}
	// 对响应错误做点什么
	return Promise.reject(error);
});



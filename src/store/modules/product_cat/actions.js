const getCameraID = ({ state, commit }, query) => {
	var {typeProduct, id} = query,
	 	data = eval(`state.${typeProduct}`),
	 	obj;

	for(let item of data) {
		if(item.id === id) {
			obj = item
		}
	}
	
	return obj;
};

export default {
  	getCameraID
};
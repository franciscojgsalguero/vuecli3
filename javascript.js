const app = new Vue({
	el: '#app',
	data: {
		titulo: 'Crear Comanda',
		productos: [
		],
		comandas: [
		],
		nombre: '',
		preu: 1,
		cantidad: 1
	},
	computed: {
		sumarProductos: function () {
			let total = 0;
			for(producto of this.productos) {
				total = total + producto.preu*producto.cantidad;
			}

			return total;
		}		
	},
	methods: {
		agregarProducto: function () {
			if(this.nombre != '') {
				this.productos.push({
					nombre: this.nombre , preu: this.preu, cantidad: 1, total_producto: this.preu * this.cantidad,
				});
				this.nombre = '';
				this.preu = 1;
			}
		},
		eliminar: function (index) {
			if (this.productos.length != 0) {
				this.productos.splice(index, 1);
			}
		},
		eliminarUltima: function () {
			if (this.productos.length != 0) {
				this.productos.pop();
			}
		},
		procesarComanda1: function() {
			var myJsonString = JSON.stringify(this.productos);
			this.comandas.push({
				myJsonString
			});
			localStorage.setItem('gym-vue', JSON.stringify(this.comandas));
			this.nombre = '';
			console.log(this.comandas[0]);
		},
		procesarComanda: function() {
	      fetch('http://localhost:3000/posts/1')
	        .then(response => response.json())
	        .then(posts => {
	        	posts.forEach(posts => {
						this.comandas.push({
							userId: posts.userId , id: posts.id, title: posts.title, body: posts.title
						});
	        		console.log(posts);
	        	})
	        })
	    }
		}
})
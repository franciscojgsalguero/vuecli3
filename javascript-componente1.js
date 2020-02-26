// Define a new component called button-counter
Vue.component('counter', {
  data: function () {
    return {
      count: 0
    }
  },
  methods: {
    procesarComanda: function() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => console.log(json))
    }
  }
  template: `
  <div id="listadecomandos">
	  <h1>Llistat de Comandes</h1>
    <br>
    <div id="contenido">
      <p></p>
    </div>
  </div>
  `
})
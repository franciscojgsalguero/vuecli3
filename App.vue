<template>
  <div id="App">
    <div>
      <h1>SHOPPING LIST</h1>
    </div>
    <div id="list">
      <table>
        <tr>
          <th>Products</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
        <tr v-for="(p,index) in products" v-bind:key="p.index">
          <td>{{p.name}}</td>
          <td>{{p.price}}</td>
          <td>
            <input type="number" min="1" v-model="p.quantity" />
          </td>
          <td>{{subtotal(p.price,p.quantity)}}</td>
          <td>
            <button v-on:click="removeRow(index)">Remove</button>
          </td>
        </tr>
      </table>
      <div id="total">
        <p>Total: {{total()}}</p>
        <button v-on:click="addorder">Save Order:</button>
      </div>

      <div id="newProd">
        <h5>Name:</h5>
        <input type="text" placeholder="Name" v-model="name" />
        <h5>Price:</h5>
        <input type="number" min="1" placeholder="Price" v-model="price" />
        <button v-on:click="add">Add</button>
        <button v-on:click="removeLast">Delete the last row</button>
      </div>
    </div>
    <div id="order_list">
      <h1>Order List</h1>
      <ul>
        <li v-for="c in results" v-bind:key="c.id">
          <h6>Order: {{c.order}}{{c.date}}</h6>
          <button>Edit</button>
          <button v-bind:id="c.id" v-on:click="removeorder(c.id)">Remove</button>
          <table>
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
            <tr v-for="p in c.products" v-bind:key="p.id">
              <td class="text-primary" >{{p.name}}</td>
              <td>{{p.price}}</td>
              <td>{{p.quantity}}</td>
              <td>{{p.subtotal}}</td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    data: function() {
      //aqui van las variables
      return {
        myURL: "http://localhost:3000/orders",
        ttotal: 0,
        name: "",
        price: 1,
        quantity: 1,
        ptotal: 0,
        index: 0,
        results: [],
        products: []
      };
    },
    mounted: function() {
      this.mostrarorder();
    },
    methods: {

      add: function() {
        this.products.push({
          name: this.name,
          price: this.price,
          quantity: this.quantity,
          subtotal: (this.ptotal = this.subtotal)
        });
      },

      subtotal: function(price, quantity) {
        this.ptotal = price * quantity;
        return this.ptotal;
      },

      total: function() {
        var sum = 0;
        this.products.forEach(prod => {
          sum += Number(prod.price * prod.quantity);
        });
        return sum;
      },

      removeRow: function(index) {
        this.products.splice(index, 1);
      },

      removeLast: function() {
        this.products.pop();
      },

      addorder: function() {
        let now = new Date();
        let dateString =
          now.getDate() +
          "/" +
          now.getMonth() +
          "/" +
          now.getFullYear() +
          "-" +
          now.getHours() +
          ":" +
          now.getMinutes();
        fetch(this.myURL, {
          method: "POST",
          body: JSON.stringify({
            date: dateString,
            total: this.ttotal,
            products: this.products
          }),
           headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        })
          .then(response => response.json())
          .then(json => console.log(json));
      },
      mostrarorder: function() {
        fetch(this.myURL)
          .then(response => response.json())
          .then(json => (this.results = json));
      },
      removeorder: function(id) {
        fetch(this.myURL + "/" + id, {
          method: "DELETE"
        })
          .then(response => response.json())
          .then(json => console.log(json))
          .catch(error => console.log(error + "Error"));
      }
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  div#App{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  div#list {
    grid-column: 1/2;
  }
  div#order_list {
    grid-column: 2/3;
  }
</style>

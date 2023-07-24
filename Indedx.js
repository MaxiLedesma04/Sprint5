const {createApp} = Vue

const options ={
    data(){
        return{
            events: null,
            categorias:[],
            valorSearch:"",
            valorCheked:[],
            filtrado:[],

        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(resulte => resulte.json())
        .then(resulte => {
            this.events = resulte.events
            this.filtrado = resulte.events
            this.categorias = [... new Set(resulte.events.filter(event => event.category).map(event=>event.category))]
            console.log(this.events)
        })    
        .catch(error => console.error(error))
    },
    methods:{
        fnFiltrado(){
            this.filtrado = this.events.filter(event=>{
                return event.name.toLowerCase().includes(this.valorSearch.toLowerCase()) &&
                (this.valorCheked.includes(event.category) || this.valorCheked.length == 0)
            })

        },
    }
}

const app = createApp(options)

app.mount('#app')
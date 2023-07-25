const {createApp} = Vue 

const options = {
    data(){
        return{
        events: null,
        categorias:[],
        valorSearch:"",
        valorCheked:[],
        filtrado:[],
        current:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(result => result.json())
        .then(result =>{
            this.events = result.events.filter(evento => evento.date < result.currentDate)
            console.log(this.events)
            this.filtrado = result.events.filter(evento => evento.date < result.currentDate)
            this.categorias = [... new Set(result.events.filter(event => event.category).map(event=>event.category))]
        
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
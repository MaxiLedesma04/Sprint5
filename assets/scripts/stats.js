const {createApp} = Vue 

const options = {
    data(){
        return{
        events: null,
        categoriasPass: [],
        categoriasUPcom: [],
        mayorAssis: "",
        menorAssis:"",
        mayorPorcent: Number,
        menorPorcent: Number,
        arrayOrder: [],
        eventMayor: "",
        eventNum: Number,
        arrayPorcent: [],
        pasadoEvents: [],
        upcomEvents:[],
        objEventUp: null,
        objEventPass:null,
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(result => result.json())
        .then(datos => {
            this.events= datos.events
            this.arrayOrder = Array.from(this.events).sort(function(a, b){
        return b.capacity - a.capacity
    }),
            this.eventMayor = this.arrayOrder[0].name
            this.eventNum = this.arrayOrder[0].capacity

        function calculoPorcent(assistance, capacidad){
            let porcent = (assistance / capacidad) * 100
            return porcent
        }
        this.pasadoEvents = datos.events.filter(evento => evento.date < datos.currentDate)
        this.arrayPorcent = this.pasadoEvents.sort((a,b)=>calculoPorcent(a.assistance, a.capacity) - calculoPorcent(b.assistance, b.capacity))

         this.menorAssis = this.arrayPorcent[0]
         this.mayorAssis = this.arrayPorcent[this.arrayPorcent.length-1]

        this.mayorPorcent = calculoPorcent(this.mayorAssis.assistance, this.mayorAssis.capacity).toFixed(1)
        this.menorPorcent = calculoPorcent(this.menorAssis.assistance, this.menorAssis.capacity).toFixed(1)
        
        this.upcomEvents = datos.events.filter(evento => evento.date >= datos.currentDate)

        let catPast = this.pasadoEvents.map(evento => evento.category)
        catPast = Array.from(new Set(catPast))

        let catUp = this.upcomEvents.map(evento => evento.category)
        catUp = Array.from(new Set(catUp))

        this.objEventUp = catUp.map((categoria) => {
            let aux = {
                category: categoria
            }


            let catEvents = this.upcomEvents.filter(evento => evento.category == categoria)

            const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.estimate), 0)

            aux.revenue = revenue.toLocaleString()

            let porcEstimate = catEvents.reduce((acc, act) => acc + (act.estimate / (act.capacity / 100)), 0) / catEvents.length
            aux.porcEstimate = porcEstimate.toFixed(2)
            return aux
        })


        this.objEventPass =  catPast.map((categoria) => {
            let aux = {
                category: categoria
            }


            let catEvents = this.pasadoEvents.filter(evento => evento.category == categoria)

            const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.assistance), 0)

            aux.revenue = revenue.toLocaleString()

            let porcAssistence = catEvents.reduce((acc, act) => acc + (act.assistance / (act.capacity / 100)), 0) / catEvents.length
            aux.porcAssistence = porcAssistence.toFixed(2)
            return aux
        })





        })
        .catch(error => console.error(error))
    }

}

const app = createApp(options)

app.mount('#app')
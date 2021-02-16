<template>
  <div>
    <div class="myrow">
        <div class="card warning active">
            <div class="myrow">
                <div class="card-icon">
                    <i class="fa fa-pizza-slice"></i>
                </div>
                <div class="card-text">
                    <span>Produtos Finais</span>
                </div>
            </div>
        </div>
        <div class="card blue inactive">
            <div class="myrow">
                <div class="card-icon">
                    <i class="fa fa-blender"></i>
                </div>
                <div class="card-text">
                    <span>Produtos Preparados</span>
                </div>
            </div>
        </div>
        <div class="card success inactive">
            <div class="myrow">
                <div class="card-icon">
                    <i class="fa fa-boxes"></i>
                </div>
                <div class="card-text">
                    <span>Insumos</span>
                </div>
            </div>
        </div>
    </div>
    <div class="container2 mt">    
        <v-grid theme="compact" :source="rows" :columns="columns"></v-grid>
    </div>
  </div>
</template>

<script>
import VGrid from "@revolist/vue-datagrid";
export default {
  name: "App",
  data() {
    return {
      columns: [
        {
          prop: "name",
          name: "First",
        },
        {
          prop: "details",
          name: "Second",
        },
      ],
      rows: [
        {
          name: "1",
          details: "Item 1",
        },
        {
          name: "2",
          details: "Item 2",
        },
      ],
    };
  },
  components: {
    VGrid,
  },
};
</script>

<style>
  .mt {
      margin-top: 1em;
  }
  .card {
    display: flex;
    box-shadow: 3px 6px 10px #888888;
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0);
    width:100%;
    margin: 10px;
  }
  .card:hover {
    transform: scale(1.01);
    cursor: pointer;
  }
  .card-text {
    padding: 20px;
  }
  .card-icon {
    padding-top:20px;
    padding-left:20px;
    padding-bottom:20px;
  }
  .card.active {
      opacity: 1;
  }
  .card.inactive{
      opacity: 0.5;
  }
.container2 {
  height: 200px;
  width: 500px;
  background: white;
}

</style>
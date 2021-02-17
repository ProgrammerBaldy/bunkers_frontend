<template>
  <div>
    <div class="myrow">
        <div class="card warning inactive">
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
        <div class="card success active">
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
    <vue-table-dynamic :params="params" @cell-change="onCellChange" ref="table">
      <template v-slot:column-4="{ props }">
        <div class="myrow">
        <button class="blue tableicon" v-on:click="edit(props.cellData)"><i class="fa fa-edit"></i></button>
          <button class="danger tableicon" v-on:click="edit(props.cellData)"><i class="fa fa-trash"></i></button>
        </div>
      </template>
    </vue-table-dynamic>
    </div>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'
import { getAPI } from "../../axios-api";
import { mapState } from "vuex";
export default {
  name: 'Demo',
  data() {
    return {
      params: {
        data: '',
        header: 'row',
        border: true,
        stripe: true,
        enableSearch: true,
        sort: [0, 1, 2],
        pagination: true,
        pageSize: 5,
        textOverflow : "ellipsis",
        pageSizes: [5, 10, 20, 50],
        edit: {
          column: [2],
          cell: [[-1, -1]]
        }
      }
    }
  },
  created() {
    getAPI
      .get("/supplies/", {
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }
      })
      .then(response => {
        this.params.data = response.data.raw_data;
        console.log(response.data.raw_data)
      })
  },
  components: { VueTableDynamic },
  computed : mapState(["APIData"]),
  methods: {
    edit: function (id) {
      console.log('the id was: '+id)
    },
    onCellChange (rowIndex, columnIndex, data) {
      console.log('onCellChange: ', rowIndex, columnIndex, data)
      console.log('table data: ', this.$refs.table.getData())
    }
  },
}
</script>

<style>
  .tableicon {
    padding: 5px;
    border-radius: 5px;
    color: black;
    width: 30px
  }
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
    color: black;
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
</style>
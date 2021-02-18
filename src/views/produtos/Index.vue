<template>
  <div>
    <div class="myrow">
        <div v-on:click="getTable('products')" v-bind:class="{ active: is_ProdActive, inactive: !is_ProdActive}" class="card warning">
            <div class="myrow">
                <div class="card-icon">
                    <i class="fa fa-pizza-slice"></i>
                </div>
                <div class="card-text">
                    <span>Produtos Finais</span>
                </div>
            </div>
        </div>
        <div v-on:click="getTable('subproducts')" v-bind:class="{ active: is_SubProdActive, inactive: !is_SubProdActive}" class="card blue">
            <div class="myrow">
                <div class="card-icon">
                    <i class="fa fa-blender"></i>
                </div>
                <div class="card-text">
                    <span>Produtos Preparados</span>
                </div>
            </div>
        </div>
        <div v-on:click="getTable('supplies')" v-bind:class="{ active: is_SupplyActive, inactive: !is_SupplyActive}" class="card mysuccess">
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
        <div id="loader" class="loader">Loading...</div>
        <div v-if="table_visibility" class="customtable" id="customtable">
            <div v-if="is_SupplyActive">
                <div class="mycolumn">
                    <div>
                        <vue-table-dynamic :params="params" @cell-change="onCellChange" ref="table">
                            <template v-slot:column-4="{ props }">
                              <div class="myrow">
                                <div class="mydanger button" v-on:click="delete_cell(props.cellData)">
                                  <i class="far fa-trash-alt text-black"></i>
                                </div>
                              </div>
                            </template>
                        </vue-table-dynamic>
                    </div>
                    <div class="to-end">
                        <div class="mysuccess mt button">
                          <div class="myrow">
                            <div v-on:click="callAddModal()" @click="$refs.addSupply.openModal()"><i class="fa fa-plus mr"></i>Adicionar</div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="is_SubProdActive">
                <vue-table-dynamic :params="params" @cell-change="onCellChange" ref="table">
                  <template v-slot:column-4="{ props }">
                    <div class="myrow">
                        <button class="blue tableicon" v-on:click="edit(props)"><i class="fa fa-edit"></i></button>
                        <button class="mydanger tableicon" v-on:click="delete_cell(props.cellData)"><i class="fa fa-trash"></i></button>
                    </div>
                  </template>
                </vue-table-dynamic>
            </div>
            <div v-else-if="is_ProdActive">
                <vue-table-dynamic :params="params" @cell-change="onCellChange" ref="table">
                    <template v-slot:column-4="{ props }">
                        <div class="myrow">
                          <button class="blue tableicon" v-on:click="edit(props)"><i class="fa fa-edit"></i></button>
                          <button class="mydanger tableicon" v-on:click="delete_cell(props.cellData)"><i class="fa fa-trash"></i></button>
                        </div>
                    </template>
                </vue-table-dynamic>
            </div>
        </div>
    </div>
    
    <Modal ref="addSupply">
      <template v-slot:header>
        <h1>Adicionar Insumo</h1>
      </template>

      <template v-slot:body>
        <div class="modal-form">
            <div class="mycolumn">
              <label for="name">Nome</label>
              <input class="form-control" v-model="supply_name" type="text" id="name" required placeholder="Farinha de Trigo, azeitona..">
            </div>
            <div class="mycolumn">
              <label for="measure_unit">Unidade de Medida</label>
              <input class="form-control" type="text" v-model="supply_measure_unit" id="measure_unit" required placeholder="kg, ml..">
            </div>
            <div class="mycolumn">
              <label for="stock">Quantidade em Estoque</label>
              <input class="form-control" type="number" min="0" step="0.01" v-model="supply_stock" id="stock" required placeholder="1.00, 3, 5.45...">
            </div>
            <div class="mycolumn">
              <label for="average_cost">Custo Médio</label>
              <input class="form-control" type="number" min="0" step="0.01" v-model="supply_average_cost" id="average_cost" required placeholder="1.00, 3, 5.45...">
            </div>
        </div>
      </template>

      <template v-slot:footer>
        <div>
          <div class="myrow">
            <div class="button mydanger" @click="$refs.addSupply.closeModal()"><i class="fa fa-ban mr text-black"></i><span class="text-black regular-font">Cancelar</span></div>
            <div class="button mysuccess" @click="addSupply();$refs.addSupply.closeModal();"><i class="fa fa-save mr text-black"></i><span class="text-black regular-font">Salvar</span></div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic';
import { getAPI } from "../../axios-api";
import Modal from "../../components/Modal"
export default {
  name: 'Demo',
  data() {
    return {
      is_ProdActive: false,
      is_SubProdActive: false,
      is_SupplyActive: false,
      table_visibility: false,
      active_view: '',
      supply_name: '',
      supply_measure_unit: '',
      supply_stock: '',
      supply_average_cost: '',
      header_keys: [],
      params: {
        data: '',
        header: 'row',
        border: true,
        stripe: true,
        enableSearch: true,
        sort: [0, 1, 2, 3],
        pagination: true,
        pageSize: 5,
        textOverflow : "ellipsis",
        pageSizes: [5, 10, 20, 50],
        edit: {
          column: [0, 1, 2, 3],
          cell: [[-1, -1]]
        }
      }
    }
  },
  created() {
  },
  components: { VueTableDynamic, Modal },
  methods: {
    addSupply: function () {
      this.toogleLoading()
      this.table_visibility = false
      let data_obj = {
          "name" : this.supply_name,
          "measure_unit" : this.supply_measure_unit,
          "stock" : this.supply_stock,
          "average_cost" : this.supply_average_cost
      }
      getAPI.post("/"+this.active_view+"/", data_obj, {
              headers: {
                  Authorization: `Bearer ${this.$store.state.accessToken}`
              }
          }, 
      ).then( () => {
        this.getTable(this.active_view)
      }).finally(
        ()=>{ this.toogleLoading() }
      )
    },
    edit: function (props) {
      // loop through props.rowData to get the values
      console.log(props)
    },
    callAddModal: function () {

    },
    delete_cell: function (props) {
        this.toogleLoading()
        this.table_visibility = false
        switch (this.active_view) {
            case 'supplies':
            case 'subproducts':
            case 'products':
                break;
            default :
                this.active_view = ''
                break;
        }
        getAPI.delete("/"+this.active_view+"/", {
                headers: {
                    Authorization: `Bearer ${this.$store.state.accessToken}`
                },
                data: {
                    "id" : props
                }
            }, 
        ).then( () => {
          this.getTable(this.active_view)
        }).finally(
          ()=>{ this.toogleLoading() }
        )
    },
    toogleLoading(){
      document.getElementById("loader").classList.toggle("active");
    },
    getTable (endpoint) {
        this.toogleLoading()
        this.table_visibility = false
        this.is_ProdActive = false
        this.is_SubProdActive = false
        this.is_SupplyActive = false
        this.active_view = endpoint
        switch (endpoint) {
            case 'supplies':
                this.is_SupplyActive = true
                break;
            case 'subproducts':
                this.is_SubProdActive = true
                break;
            case 'products':
                this.is_ProdActive = true
                break;
            default :
                this.active_view = ''
                break;
        }
        getAPI.get("/"+endpoint+"/", {
            headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }
        })
        .then(response => {
            this.params.data = response.data.raw_data
            this.header_keys = response.data.keys
            this.table_visibility = true;
        }).catch( () => {
            this.table_visibility = false;
        }).finally ( () => {
            this.toogleLoading()
        })
    },
    onCellChange (rowIndex, columnIndex, data) {
        let table_ref = this.$refs.table.getData()
        let row_ref = table_ref[rowIndex]
        let header_key = this.header_keys[columnIndex]
        let data_obj = { "id" : row_ref[row_ref.length -1] }
        data_obj[header_key] = data
        switch (this.active_view) {
            case 'supplies':
            case 'subproducts':
            case 'products':
                break;
            default :
                this.active_view = ''
                break;
        }
        getAPI.patch("/"+this.active_view+"/", data_obj, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.accessToken}`
                }
            }, 
        )
    }
  },
}
</script>

<style>
</style>
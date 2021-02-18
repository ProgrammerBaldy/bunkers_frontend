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
                            <div @click="$refs.addSupply.openModal();ailton()"><i class="fa fa-plus mr"></i>Adicionar</div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- subprod -->
            <div v-else-if="is_SubProdActive">
                <div class="mycolumn">
                    <div>
                        <vue-table-dynamic :params="params" @cell-change="onCellChange" ref="table">
                            <template v-slot:column-4="{ props }">
                              <div class="myrow">
                                <div class="mydanger button" v-on:click="dele1te_cell(props.cellData)">
                                  <i class="far fa-trash-alt text-black"></i>
                                </div>
                              </div>
                            </template>
                        </vue-table-dynamic>
                    </div>
                    <div class="to-end">
                        <div class="mysuccess mt button">
                          <div class="myrow">
                            <div @click="$refs.addSubProd.openModal();ailton()"><i class="fa fa-plus mr"></i>Adicionar</div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end subprod -->

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

    <!-- subprod modal -->
    <Modal ref="addSubProd">
      <template v-slot:header>
        <h1>Adicionar Produto Preparado</h1>
      </template>

      <template v-slot:body>
        <div>
            <div class="modal-form">
                <div class="mycolumn">
                <label for="name">Nome</label>
                <input class="form-control" v-model="subproduct_name" type="text" id="name" required placeholder="Camarão Salteado, Massa de Pizza..">
                </div>
                <div class="mycolumn">
                <label for="measure_unit">Unidade de Medida</label>
                <input class="form-control" type="text" v-model="subproduct_measure_unit" id="measure_unit" required placeholder="kg, ml..">
                </div>
                <div class="mycolumn">
                <label for="stock">Quantidade em Estoque</label>
                <input class="form-control" type="number" min="0" step="0.01" v-model="subproduct_stock" id="stock" required placeholder="1.00, 3, 5.45...">
                </div>
                <div class="mycolumn">
                <label for="average_cost">Custo Médio de Produção</label>
                <input class="form-control" type="number" min="0" step="0.01" v-model="subproduct_average_cost" id="average_cost" required placeholder="Sem considerar os insumos!">
                </div>
            </div>
            <div class="mt2"></div>
            <div v-for="(item, index) in supply_rows" :key="`item-${index}`">
                <div class="flex-container mt">
                    <div class="flex-container-column">
                        <div class="flex-item">
                            <label>Insumo(s)</label>
                        </div>
                        <select name="" id="" class="form-control" v-model="item.supplyid">
                            <option v-for="option in insumos" :value="option[0]" :key="option[4]">{{option[0] +' ('+ option[1] +')'}}</option>
                        </select>
                    </div>
                    <div class="flex-container-column">
                        <div class="flex-item">
                            <label>Quantidade</label>
                        </div>
                        <input type="number" v-model="item.quantity" step="0.0001" min="0" class="form-control" placeholder="Quantidade">
                    </div>
                </div>
            </div>
            <div class="flex-container flex-right mt">
                <div class="button blue" v-on:click="addRowInsumo()"><i class="fa fa-plus mr text-black"></i><span class="text-black regular-font">Adicionar Insumo</span></div>
            </div>
        </div>
              
      </template>

      <template v-slot:footer>
        <div>
          <div class="myrow">
            <div class="button mydanger" @click="$refs.addSupply.closeModal()"><i class="fa fa-ban mr text-black"></i><span class="text-black regular-font">Cancelar</span></div>
            <div class="button mysuccess" @click="addSubProduct();$refs.addSupply.closeModal();"><i class="fa fa-save mr text-black"></i><span class="text-black regular-font">Salvar</span></div>
          </div>
        </div>
      </template>
    </Modal>
    <!-- end subprod modal -->
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
      subproduct_name: '',
      subproduct_measure_unit: '',
      subproduct_stock: '',
      subproduct_average_cost: '',
      supply_rows: [{ supplyid: '', quantity: 0 }],
      active_view: '',
      supply_name: '',
      supply_measure_unit: '',
      supply_stock: '',
      supply_average_cost: '',
      header_keys: [],
      insumos:[],
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
  mounted() {
      this.getTable('supplies')
  },
  components: { VueTableDynamic, Modal },
  methods: {
    addRowInsumo: function() {
        this.supply_rows.push({ supplyid: '', quantity: 0 })
    },
    ailton: function(){
        console.log(this.insumos)
    },
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
    addSubProduct: function () {
      this.toogleLoading()
      this.table_visibility = false
      let data_obj = {
          "name" : this.subproduct_name,
          "measure_unit" : this.subproduct_measure_unit,
          "stock" : this.subproduct_stock,
          "average_cost" : this.subproduct_average_cost,
          "supplies" : this.supply_rows
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
            this.insumos = (endpoint == 'supplies') ? response.data.raw_data.slice(1) : this.insumos
            this.header_keys = response.data.keys
            this.table_visibility = true;
        }).catch( () => {
            this.table_visibility = true;
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
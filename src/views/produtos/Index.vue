<template>
  <div>
    <div class="myrow">
      <div
        v-on:click="getTable('supplies')"
        v-bind:class="{ active: is_SupplyActive, inactive: !is_SupplyActive }"
        class="card mysuccess"
      >
        <div class="myrow">
          <div class="card-icon">
            <i class="fa fa-boxes"></i>
          </div>
          <div class="card-text">
            <span>Insumos</span>
          </div>
        </div>
      </div>
      <div
        v-on:click="getTable('subproducts')"
        v-bind:class="{ active: is_SubProdActive, inactive: !is_SubProdActive }"
        class="card blue"
      >
        <div class="myrow">
          <div class="card-icon">
            <i class="fa fa-blender"></i>
          </div>
          <div class="card-text">
            <span>Produtos Preparados</span>
          </div>
        </div>
      </div>
      <div
        v-on:click="getTable('products')"
        v-bind:class="{ active: is_ProdActive, inactive: !is_ProdActive }"
        class="card warning"
      >
        <div class="myrow">
          <div class="card-icon">
            <i class="fa fa-pizza-slice"></i>
          </div>
          <div class="card-text">
            <span>Produtos Finais</span>
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
              <vue-table-dynamic
                :params="params"
                @cell-change="onCellChange"
                ref="table"
              >
                <template v-slot:column-4="{ props }">
                  <div class="myrow">
                    <div
                      class="mydanger button"
                      v-on:click="delete_cell(props.cellData)"
                    >
                      <i class="far fa-trash-alt text-black"></i>
                    </div>
                  </div>
                </template>
              </vue-table-dynamic>
            </div>
            <div class="to-end">
              <div class="mysuccess mt button">
                <div class="myrow">
                  <div @click="$refs.addSupply.openModal()">
                    <i class="fa fa-plus mr"></i>Adicionar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- subprod -->
        <div v-else-if="is_SubProdActive">
          <div class="mycolumn">
            <div>
              <vue-table-dynamic
                :params="params"
                @cell-change="onCellChange"
                ref="table"
              >
                <template v-slot:column-4="{ props }">
                  <div class="myrow">
                    <div
                      class="blue button"
                      @click="open_prod_edit(props.cellData)"
                    >
                      <i class="far fa-edit text-black"></i>
                    </div>
                    <div
                      class="mydanger button"
                      v-on:click="delete_cell(props.cellData)"
                    >
                      <i class="far fa-trash-alt text-black"></i>
                    </div>
                  </div>
                </template>
              </vue-table-dynamic>
            </div>
            <div class="to-end">
              <div class="mysuccess mt button">
                <div class="myrow">
                  <div @click="$refs.addSubProd.openModal()">
                    <i class="fa fa-plus mr"></i>Adicionar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end subprod -->

        <div v-else-if="is_ProdActive">
          <vue-table-dynamic
            :params="params"
            @cell-change="onCellChange"
            ref="table"
          >
            <template v-slot:column-4="{ props }">
              <div class="myrow">
                <button class="blue tableicon" v-on:click="edit(props)">
                  <i class="fa fa-edit"></i>
                </button>
                <button
                  class="mydanger tableicon"
                  v-on:click="delete_cell(props.cellData)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </template>
          </vue-table-dynamic>
        <div class="to-end">
            <div class="mysuccess mt button">
            <div class="myrow">
                <div @click="$refs.addProduct.openModal()">
                <i class="fa fa-plus mr"></i>Adicionar
                </div>
            </div>
            </div>
        </div>
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
            <input
              class="form-control"
              v-model="supply_name"
              type="text"
              id="name"
              required
              placeholder="Farinha de Trigo, azeitona.."
            />
          </div>
          <div class="mycolumn">
            <label for="measure_unit">Unidade de Medida</label>
            <input
              class="form-control"
              type="text"
              v-model="supply_measure_unit"
              id="measure_unit"
              required
              placeholder="kg, ml.."
            />
          </div>
          <div class="mycolumn">
            <label for="stock">Quantidade em Estoque</label>
            <input
              class="form-control"
              type="number"
              min="0"
              step="0.01"
              v-model="supply_stock"
              id="stock"
              required
              placeholder="1.00, 3, 5.45..."
            />
          </div>
          <div class="mycolumn">
            <label for="average_cost">Custo Médio</label>
            <input
              class="form-control"
              type="number"
              min="0"
              step="0.01"
              v-model="supply_average_cost"
              id="average_cost"
              required
              placeholder="1.00, 3, 5.45..."
            />
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div>
          <div class="myrow">
            <div class="button mydanger" @click="$refs.addSupply.closeModal()">
              <i class="fa fa-ban mr text-black"></i
              ><span class="text-black regular-font">Cancelar</span>
            </div>
            <div
              class="button mysuccess"
              @click="
                addSupply();
                $refs.addSupply.closeModal();
              "
            >
              <i class="fa fa-save mr text-black"></i
              ><span class="text-black regular-font">Salvar</span>
            </div>
          </div>
        </div>
      </template>
    </Modal>

    <!-- subprod add modal -->
    <Modal ref="addSubProd">
      <template v-slot:header>
        <h1>Adicionar Produto Preparado</h1>
      </template>

      <template v-slot:body>
        <div>
          <div class="modal-form">
            <div class="mycolumn">
              <label for="name">Nome</label>
              <input
                class="form-control"
                v-model="subproduct_name"
                type="text"
                id="name"
                required
                placeholder="Camarão Salteado, Massa de Pizza.."
              />
            </div>
            <div class="mycolumn">
              <label for="measure_unit">Unidade de Medida</label>
              <input
                class="form-control"
                type="text"
                v-model="subproduct_measure_unit"
                id="measure_unit"
                required
                placeholder="kg, ml.."
              />
            </div>
            <div class="mycolumn">
              <label for="stock">Quantidade em Estoque</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="subproduct_stock"
                id="stock"
                required
                placeholder="1.00, 3, 5.45..."
              />
            </div>
            <div class="mycolumn">
              <label for="average_cost">Custo Médio de Produção</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="subproduct_average_cost"
                id="average_cost"
                required
                placeholder="Sem considerar os insumos!"
              />
            </div>
            <div class="mycolumn">
              <label for="recipe_final_weight">Peso Final da Receita</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="subproduct_recipe_final_weight"
                id="recipe_final_weight"
                required
                placeholder="Em kg, ml..."
              />
            </div>
          </div>
          <div class="mt2"></div>
          <div v-for="(item, index) in supply_rows" :key="`item-${index}`">
            <div class="flex-container mt">
              <div class="flex-container-column">
                <div class="flex-item">
                  <label>Insumo(s)</label>
                </div>
                <select
                  name=""
                  id=""
                  class="form-control"
                  v-model="item.supplyid"
                >
                  <option
                    v-for="option in insumos"
                    :value="option[4]"
                    :key="option[4]"
                    >{{ option[0] + " (" + option[1] + ")" }}</option
                  >
                </select>
              </div>
              <div class="flex-container-column">
                <div class="flex-item">
                  <label>Quantidade</label>
                </div>
                <input
                  type="number"
                  v-model="item.quantity"
                  step="0.0001"
                  min="0"
                  class="form-control"
                  placeholder="Quantidade"
                />
              </div>
            </div>
          </div>
          <div class="flex-container flex-right mt">
            <div class="button blue" v-on:click="addRowInsumo()">
              <i class="fa fa-plus mr text-black"></i
              ><span class="text-black regular-font">Adicionar Insumo</span>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div>
          <div class="myrow">
            <div class="button mydanger" @click="$refs.addSubProd.closeModal()">
              <i class="fa fa-ban mr text-black"></i
              ><span class="text-black regular-font">Cancelar</span>
            </div>
            <div
              class="button mysuccess"
              @click="
                addSubProduct();
                $refs.addSubProd.closeModal();
              "
            >
              <i class="fa fa-save mr text-black"></i
              ><span class="text-black regular-font">Salvar</span>
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <!-- end subprod add modal -->

    <!-- subprod edit modal -->
    <Modal ref="editSubProd">
      <template v-slot:header>
        <h1>Adicionar Produto Preparado</h1>
      </template>

      <template v-slot:body>
        <div>
          <div class="modal-form">
            <div class="mycolumn">
              <label for="name">Nome</label>
              <input
                class="form-control"
                v-model="subproduct_name_edit"
                type="text"
                id="name"
                required
                placeholder="Camarão Salteado, Massa de Pizza.."
              />
            </div>
            <div class="mycolumn">
              <label for="measure_unit">Unidade de Medida</label>
              <input
                class="form-control"
                type="text"
                v-model="subproduct_measure_unit_edit"
                id="measure_unit"
                required
                placeholder="kg, ml.."
              />
            </div>
            <div class="mycolumn">
              <label for="stock">Quantidade em Estoque</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="subproduct_stock_edit"
                id="stock"
                required
                placeholder="1.00, 3, 5.45..."
              />
            </div>
            <div class="mycolumn">
              <label for="average_cost">Custo Médio de Produção</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="subproduct_average_cost_edit"
                id="average_cost"
                required
                placeholder="Sem considerar os insumos!"
              />
            </div>
            <div class="mycolumn">
              <label for="recipe_final_weight">Peso Final da Receita</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="subproduct_recipe_final_weight_edit"
                id="recipe_final_weight"
                required
                placeholder="Em kg, ml..."
              />
            </div>
          </div>
          <div class="mt2"></div>
            <div v-for="(item, index) in supply_rows_edit" :key="`item-${index}`">
                <div class="flex-container mt">
                    <div class="flex-container-column">
                        <div class="flex-item">
                            <label>Insumo(s)</label>
                        </div>
                        <select name="" id="" class="form-control" v-model="item.supplyid">
                            <option v-for="option in insumos" :value="option[4]" :key="option[4]">{{option[0] +' ('+ option[1] +')'}}</option>
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
            <div class="button blue" v-on:click="addRowEditInsumo()">
              <i class="fa fa-plus mr text-black"></i
              ><span class="text-black regular-font">Adicionar Insumo</span>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div>
          <div class="myrow">
            <div
              class="button mydanger"
              @click="$refs.editSubProd.closeModal()"
            >
              <i class="fa fa-ban mr text-black"></i
              ><span class="text-black regular-font">Cancelar</span>
            </div>
            <div
              class="button mysuccess"
              @click="
                editSubProduct();
                $refs.editSubProd.closeModal();
              "
            >
              <i class="fa fa-save mr text-black"></i
              ><span class="text-black regular-font">Salvar</span>
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <!-- end subprod edit modal -->

    <!-- Product add modal -->
    <Modal ref="addProduct">
      <template v-slot:header>
        <h1>Adicionar Produto Final</h1>
      </template>

      <template v-slot:body>
        <div>
          <div class="modal-form">
            <div class="mycolumn">
              <label for="name">Nome</label>
              <input
                class="form-control"
                v-model="product_name"
                type="text"
                id="name"
                required
                placeholder="Camarão Salteado, Massa de Pizza.."
              />
            </div>
            <div class="mycolumn">
              <label for="measure_unit">Unidade de Medida</label>
              <input
                class="form-control"
                type="text"
                v-model="product_measure_unit"
                id="measure_unit"
                required
                placeholder="kg, ml.."
              />
            </div>
            <div class="mycolumn">
              <label for="stock">Quantidade em Estoque</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="product_stock"
                id="stock"
                required
                placeholder="1.00, 3, 5.45..."
              />
            </div>
            <div class="mycolumn">
              <label for="selling_price">Preço de Venda</label>
              <input
                class="form-control"
                type="number"
                min="0"
                step="0.01"
                v-model="product_selling_price"
                id="selling_price"
                required
                placeholder="S/ insumos e Produtos Prepadados!"
              />
            </div>
          </div>
          <div class="mt2">
              <h2>Insumos</h2>
          </div>
          <div v-for="(item, index) in product_supply_rows" :key="`insumo-${index}`">
            <div class="flex-container mt">
              <div class="flex-container-column">
                <div class="flex-item">
                  <label>Insumo</label>
                </div>
                <select
                  name=""
                  id=""
                  class="form-control"
                  v-model="item.supplyid"
                >
                  <option
                    v-for="option in insumos"
                    :value="option[4]"
                    :key="option[4]"
                    >{{ option[0] + " (" + option[1] + ")" }}</option
                  >
                </select>
              </div>
              <div class="flex-container-column">
                <div class="flex-item">
                  <label>Quantidade</label>
                </div>
                <input
                  type="number"
                  v-model="item.quantity"
                  step="0.0001"
                  min="0"
                  class="form-control"
                  placeholder="Quantidade"
                />
              </div>
            </div>
          </div>
          <div class="flex-container flex-right mt">
            <div class="button blue" v-on:click="addRowProdutoInsumo()">
              <i class="fa fa-plus mr text-black"></i
              ><span class="text-black regular-font">Adicionar Insumo</span>
            </div>
          </div>
          <div class="mt2">
              <h2>Produtos Preparados</h2>
          </div>
          <div v-for="(item, index) in product_subproducts_rows" :key="`subprod-${index}`">
            <div class="flex-container mt">
              <div class="flex-container-column">
                <div class="flex-item">
                  <label>Produto Preparado</label>
                </div>
                <select
                  name=""
                  id=""
                  class="form-control"
                  v-model="item.subproductid"
                >
                  <option
                    v-for="option in subproducts"
                    :value="option[4]"
                    :key="option[4]"
                    >{{ option[0] + " (" + option[1] + ")" }}</option
                  >
                </select>
              </div>
              <div class="flex-container-column">
                <div class="flex-item">
                  <label>Quantidade</label>
                </div>
                <input
                  type="number"
                  v-model="item.quantity"
                  step="0.0001"
                  min="0"
                  class="form-control"
                  placeholder="Quantidade"
                />
              </div>
            </div>
          </div>
          <div class="flex-container flex-right mt">
            <div class="button blue" v-on:click="addRowProdutoSubproduto()">
              <i class="fa fa-plus mr text-black"></i
              ><span class="text-black regular-font">Adicionar Produto Preparado</span>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div>
          <div class="myrow">
            <div class="button mydanger" @click="$refs.addProduct.closeModal()">
              <i class="fa fa-ban mr text-black"></i
              ><span class="text-black regular-font">Cancelar</span>
            </div>
            <div
              class="button mysuccess"
              @click="
                addProduct();
                $refs.addProduct.closeModal();
              "
            >
              <i class="fa fa-save mr text-black"></i
              ><span class="text-black regular-font">Salvar</span>
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <!-- end subprod add modal -->
  </div>
</template>

<script>
import VueTableDynamic from "vue-table-dynamic";
import { getAPI } from "../../axios-api";
import Modal from "../../components/Modal";
export default {
  name: "Demo",
  data() {
    return {
      is_ProdActive: false,
      is_SubProdActive: false,
      is_SupplyActive: false,
      table_visibility: false,
      subproduct_name: "",
      subproduct_measure_unit: "",
      subproduct_stock: "",
      subproduct_average_cost: "",
      subproduct_recipe_final_weight: "",
      subproduct_name_edit: "",
      subproduct_measure_unit_edit: "",
      subproduct_stock_edit: "",
      subproduct_average_cost_edit: "",
      subproduct_recipe_final_weight_edit: "",
      supply_rows: [{ supplyid: "", quantity: 0 }],
      supply_rows_edit : [],
      subprod_edit_id : "",
      active_view: "",
      supply_name: "",
      supply_measure_unit: "",
      supply_stock: "",
      supply_average_cost: "",
      product_name: "",
      product_measure_unit: "",
      product_stock: "",
      product_selling_price: "",
      product_supply_rows: [{ supplyid: "", quantity: 0 }],
      product_subproducts_rows: [{ subproductid: "", quantity: 0 }],
      header_keys: [],
      insumos: [],
      subproducts: [],
      params: {
        data: "",
        header: "row",
        border: true,
        stripe: true,
        enableSearch: true,
        sort: [0, 1, 2, 3],
        pagination: true,
        pageSize: 5,
        textOverflow: "ellipsis",
        pageSizes: [5, 10, 20, 50],
        edit: {
          column: [0, 1, 2, 3],
          cell: [[-1, -1]]
        }
      }
    };
  },
  created() {
      this.$store.commit('change_page','Produtos')
  },
  mounted() {
    this.getTable("supplies");
  },
  components: { VueTableDynamic, Modal },
  methods: {
    addRowProdutoInsumo: function() {
      this.product_supply_rows.push({ supplyid: "", quantity: 0 });
    },
    addRowProdutoSubproduto: function() {
      this.product_subproducts_rows.push({ supplyid: "", quantity: 0 });
    },
    open_prod_edit: function(id) {
      getAPI
        .get("subproducts/"+id, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        })
        .then((response) => {
          this.subprod_edit_id = id
          this.subproduct_name_edit = response.data.subproduct[0][0]
          this.subproduct_measure_unit_edit = response.data.subproduct[0][1]
          this.subproduct_stock_edit = response.data.subproduct[0][2]
          this.subproduct_average_cost_edit = response.data.subproduct[0][3]
          let dummy = []
          for (let i = 0; i < response.data.supplies.length; i++) {
              dummy.push({ supplyid: response.data.supplies[i][4], quantity: response.data.supplies[i][2] })
          }
          this.supply_rows_edit = dummy
          this.$refs.editSubProd.openModal();
        })
        .finally(() => {
        });
    },
    addRowEditInsumo: function() {
      this.supply_rows_edit.push({ supplyid: "", quantity: 0 });
    },
    addRowInsumo: function() {
      this.supply_rows.push({ supplyid: "", quantity: 0 });
    },
    addSupply: function() {
      this.toogleLoading();
      this.table_visibility = false;
      let data_obj = {
        name: this.supply_name,
        measure_unit: this.supply_measure_unit,
        stock: this.supply_stock,
        average_cost: this.supply_average_cost
      };
      getAPI
        .post("/" + this.active_view + "/", data_obj, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        })
        .then(() => {
          this.getTable(this.active_view);
        })
        .finally(() => {
          this.toogleLoading();
        });
    },
    editSubProduct: function() {
      this.toogleLoading();
      this.table_visibility = false;
      let data_obj = {
        name: this.subproduct_name_edit,
        measure_unit: this.subproduct_measure_unit_edit,
        stock: this.subproduct_stock_edit,
        average_cost: this.subproduct_average_cost_edit,
        recipe_final_weight: this.subproduct_recipe_final_weight_edit,
        supplies: this.supply_rows_edit
      };
      console.log(data_obj)
      getAPI
        .patch("/subproducts/"+this.subprod_edit_id, data_obj, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        })
        .then(() => {
          this.getTable(this.active_view);
        })
        .finally(() => {
          this.toogleLoading();
        });
    },
    addSubProduct: function() {
      this.toogleLoading();
      this.table_visibility = false;
      let data_obj = {
        name: this.subproduct_name,
        measure_unit: this.subproduct_measure_unit,
        stock: this.subproduct_stock,
        average_cost: this.subproduct_average_cost,
        supplies: this.supply_rows,
        recipe_final_weight: this.subproduct_recipe_final_weight_edit,
      };
      getAPI
        .post("/" + this.active_view + "/", data_obj, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        })
        .then(() => {
          this.getTable(this.active_view);
        })
        .finally(() => {
          this.toogleLoading();
        });
    },
    addProduct: function() {
      this.toogleLoading();
      this.table_visibility = false;
      let data_obj = {
        name: this.product_name,
        measure_unit: this.product_measure_unit,
        average_cost: 0,
        stock: this.product_stock,
        selling_price: this.product_selling_price,
        supplies: this.product_supply_rows,
        subproducts: this.product_subproducts_rows,
      };
      getAPI
        .post("/" + this.active_view + "/", data_obj, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          }
        })
        .then(() => {
          this.getTable(this.active_view);
        })
        .finally(() => {
          this.toogleLoading();
        });
    },
    edit: function(props) {
      // loop through props.rowData to get the values
      console.log(props);
    },
    callAddModal: function() {},
    delete_cell: function(props) {
      this.toogleLoading();
      this.table_visibility = false;
      let param = "";
      switch (this.active_view) {
        case "supplies":
          break;
        case "subproducts":
          param = props;
          break;
        case "products":
          break;
        default:
          this.active_view = "";
          break;
      }
      getAPI
        .delete("/" + this.active_view + "/" + param, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`
          },
          data: {
            id: props
          }
        })
        .then(() => {
          this.getTable(this.active_view);
        })
        .finally(() => {
          this.toogleLoading();
        });
    },
    toogleLoading() {
      document.getElementById("loader").classList.toggle("active");
    },
    getTable(endpoint) {
      this.toogleLoading();
      this.table_visibility = false;
      this.is_ProdActive = false;
      this.is_SubProdActive = false;
      this.is_SupplyActive = false;
      this.active_view = endpoint;
      switch (endpoint) {
        case "supplies":
          this.is_SupplyActive = true;
          break;
        case "subproducts":
          endpoint = "subproducts_supplies";
          this.is_SubProdActive = true;
          break;
        case "products":
          this.is_ProdActive = true;
          break;
        default:
          this.active_view = "";
          break;
      }
      getAPI
        .get("/" + endpoint + "/", {
          headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }
        })
        .then(response => {
          this.params.data = response.data.raw_data;
          this.insumos =
            endpoint == "supplies"
              ? response.data.raw_data.slice(1)
              : this.insumos;
          this.subproducts =
            endpoint != "supplies"
              ? response.data.raw_data.slice(1)
              : this.subproducts;
          this.params.edit =
            endpoint == "supplies"
              ? { column: [0, 1, 2, 3], cell: [[-1, -1]] }
              : "";
          this.header_keys = response.data.keys;
          this.table_visibility = true;
        })
        .catch(() => {
          this.table_visibility = true;
        })
        .finally(() => {
          this.toogleLoading();
        });
    },
    onCellChange(rowIndex, columnIndex, data) {
      let table_ref = this.$refs.table.getData();
      let row_ref = table_ref[rowIndex];
      let header_key = this.header_keys[columnIndex];
      let data_obj = { id: row_ref[row_ref.length - 1] };
      data_obj[header_key] = data;
      switch (this.active_view) {
        case "supplies":
        case "subproducts":
        case "products":
          break;
        default:
          this.active_view = "";
          break;
      }
      getAPI.patch("/" + this.active_view + "/", data_obj, {
        headers: {
          Authorization: `Bearer ${this.$store.state.accessToken}`
        }
      });
    }
  }
};
</script>

<style></style>

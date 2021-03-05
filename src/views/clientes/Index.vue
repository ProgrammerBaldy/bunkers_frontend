<template>
  <div>
    <div class="myrow flex-apart flex-center">
        <div>
            <h1>Lista de Clientes</h1>
        </div>
        <div>
            <div class="mysuccess button">
                <div class="myrow">
                    <div @click="$refs.addSupply.openModal()">
                    <i class="fa fa-plus mr"></i>Adicionar Cliente
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container2 mt">
      <div id="loader" class="loader">Loading...</div>
      <div v-if="table_visibility" class="customtable" id="customtable">
        <div class="mycolumn">
          <div>
              <vue-table-dynamic
              :params="params"
              ref="table"
              >
              <template v-slot:column-4="{ props }">
                  <div class="myrow">
                    <div
                      class="blue button"
                      @click="open_subprod_edit(props.cellData)"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAPI } from "../../axios-api";
import VueTableDynamic from "vue-table-dynamic";
export default {
    components: {
        VueTableDynamic
    },
    data () {
        return {
            table_visibility: false,
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
        }
    },
  created() {
      this.$store.commit('change_page','Clientes')
  },
  mounted() {
    this.getTable("supplies");
  },
  methods: {
    getTable() {
      this.toogleLoading();
      this.table_visibility = false;
      getAPI
        .get("/supplies/", {
          headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }
        })
        .then(response => {
          this.params.data = response.data.raw_data;
          console.log(this.params.data)
          this.table_visibility = true;
        })
        .catch(() => {
          this.table_visibility = true;
        })
        .finally(() => {
          this.toogleLoading();
        });
    },
    toogleLoading() {
      document.getElementById("loader").classList.toggle("active");
    }
  }
}
</script>
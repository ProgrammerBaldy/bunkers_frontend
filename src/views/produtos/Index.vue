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
    <vue-table-dynamic :params="params" @cell-change="onCellChange" ref="table">
      <template v-slot:column-6="{ props }">
        <button class="primary">{{props.cellData}}--{{props.row}}--{{props.column}}</button>
      </template>
    </vue-table-dynamic>
    </div>
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'
export default {
  name: 'Demo',
  data() {
    return {
      params: {
        data: [
          ['Produto', 'Preço de Venda R$', 'Custo de Fabricação R$', 'Lucro R$', 'Unidade de Medida', 'Quantidade em Estoque', 'Ação'],
          ['Pizza 4 Queijos', '30,00', '13,00', '17,00', 'Unidade', '3', ''],
          ['Pizza 5 Queijos', '31,00', '13,00', '18,00', 'Unidade', '1', ''],
          ['Pizza 6 Queijos', '32,00', '13,00', '19,00', 'Unidade', '3', ''],
          ['Pizza 7 Queijos', '33,00', '13,00', '20,00', 'Unidade', '4', ''],
          ['Pizza 8 Queijos', '34,00', '13,00', '21,00', 'Unidade', '5', ''],
          ['Pizza 9 Queijos', '35,00', '13,00', '22,00', 'Unidade', '0', '']
        ],
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
  components: { VueTableDynamic },
  methods: {
    onCellChange (rowIndex, columnIndex, data) {
      console.log('onCellChange: ', rowIndex, columnIndex, data)
      console.log('table data: ', this.$refs.table.getData())
    }
  },
}
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
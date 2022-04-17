<template>
  <div>
    <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        style="width: 100%">
      <el-table-column
          v-for="(column, index) in columns"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :show-overflow-tooltip="true"
          :sortable="column.sortable"
          :key="index"
          :fixed="column.fixed"
      >
        <template slot-scope="scope">
          <span v-if="column.type === 'slot'">
            <slot name="slot-name" :row="scope.row"></slot>
          </span>
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteItem(scope.row)" type="text" size="small">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="pageBox">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.currentPage"
        :page-sizes="pageData.pageSizes"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total">
    </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  name: "search-result",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    pageData: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 5,
          pageSizes: [5, 10, 20, 30, 40, 50],
          total: 0
        }
      }
    },
  },

  data() {
    return {
      columns: [
        {
          label: '日期',
          prop: 'date',
          width: 180,
          sortable: true,
          type: 'string',
          sortMethod: function (a, b) {
            return a.localeCompare(b);
          }
        },
        {
          label: '姓名',
          prop: 'name',
          width: 180,
          sortable: true,
          type: 'string',
          sortMethod: function (a, b) {
            return a.localeCompare(b);
          }
        },
        {
          label: '地址',
          prop: 'address',
          sortable: true,
          type: 'string',
          sortMethod: function (a, b) {
            return a.localeCompare(b);
          }
        }
      ]
    }
  },

  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val);
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val);
    },
    check(row) {
      this.$emit('check', row);
    },
    edit(row) {
      this.$emit('edit', row);
    },
    deleteItem(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteItem', row);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  }
}
</script>

<style scoped>
.pageBox{
  text-align: right;
  margin-top: 10px;
}
</style>

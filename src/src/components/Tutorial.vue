<template>
  <div>
    <table>
      <!-- テーブルヘッダー -->
      <thead>
      <tr>
        <th class="id">ID</th>
        <th class="comment">コメント</th>
        <th class="state">状態</th>
        <th class="button">-</th>
      </tr>
      </thead>
      <tbody>
        <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
        <tr v-for="item in computedTodos" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.comment }}</td>
          <td class="state">
            <!-- 状態変更ボタンのモック -->
            <button v-on:click="doChangeState(item)">
              {{ labels[item.state] }}
            </button>
          </td>
          <td class="button">
            <!-- 削除ボタンのモック -->
            <button v-on:click="doRemove(item)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      コメント: <input type="text" ref="comment">
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script>
import todoStorage from '../plugins/todoStorage';

export default {
  name: 'Tutorial',
  data() {
    return {
      todos: [],
      uid: 0,
      options: [
        { value: -1, label: 'すべて' },
        { value: 0, label: '作業中' },
        { value: 1, label: '完了' },
      ],
      current: -1,
    }
  },
  computed: {
    computedTodos: function () {
      // データ current が -1 ならすべて
      // それ以外なら current と state が一致するものだけに絞り込む
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels () {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    },
  },
  created() {
    // インスタンス作成時に自動的にfetchする
    this.todos = todoStorage.fetch();
    this.uid = this.todos.length;
  },
  watch: {
    // オプションを使用する場合はオブジェクト形式にする
    todos: {
      //引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos);
      },
      // deepオプションでネストしているデータも監視できる
      deep: true,
    }
  },
  methods: {
    // 追加
    doAdd: function() {
      // refで名前をつけておいたやつを参照
      var comment = this.$refs.comment;
      if (!comment.value.length) {
        return;
      }
      this.todos.push({
        id: this.uid++,
        comment: comment.value,
        state: 0,
      })
      // フォーム要素を空にする
      comment.value = '';
    },
    // 状態の変更
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    // 削除
    doRemove: function(item) {
      const index = this.todos.indexOf(item)
      this.todos.splice(index, 1);
    }
  },
}
</script>

<style scoped>

</style>


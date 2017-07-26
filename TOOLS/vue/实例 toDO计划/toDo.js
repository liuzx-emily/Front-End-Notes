function store(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function fetch(key) {
    return JSON.parse(localStorage.getItem(key)) || []; //必须或上[]，不然没数据时list初始化报错
}

//vm中的list格式：
/*[
    { title: '钢之炼金术师', done: false },
   { title: '银之匙', done: false }
]*/


var vm = new Vue({
    el: '.main',
    data: {
        list: fetch('lzxTodoData'),
        newTitle: "",
        currentEditing: null,
        curEditTitle: "",
        shownWay: "all",
        active: 1
    },
    computed: {
        shownList() {
            switch (this.shownWay) {
                case "unfinished":
                    return this.list.filter(function(item) {
                        return !item.done;
                    });

                case "finished":
                    return this.list.filter(function(item) {
                        return item.done;
                    });
                default:
                    return this.list;
            }
        },
        doneNumber() {
            return this.list.filter(function(item) {
                return !item.done;
            }).length;
        }
    },
    watch: {
        list: {
            handler: function() {
                store('lzxTodoData', vm.list);
            },
            deep: true
        }
    },
    methods: {
        addTodo() {
            if (!this.newTitle.match(/^\s*$/)) {
                this.list.push({ title: this.newTitle, done: false });
            }
            this.newTitle = "";
        },
        deleteTodo(data) {
            console.log('删除')
            var index = this.list.indexOf(data);
            this.list.splice(index, 1);
        },
        editTodo(data) {
            this.curEditTitle = data.title;
            this.currentEditing = data;
        },
        editted(data) {
            this.currentEditing = null;

            this.curEditTitle = "";
        },
        cancel(data) {
            this.currentEditing = null;
            data.title = this.curEditTitle;
            this.curEditTitle = "";

        }
    },
    directives: {
        lzxfocus: {
            inserted(el, binding) {
                el.focus();
            }
        }
    }
});
window.addEventListener('hashchange', lzxHash, false);

lzxHash();

function lzxHash() {
    vm.shownWay = window.location.hash.substring(1);
}

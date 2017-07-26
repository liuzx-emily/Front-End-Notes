function Node(id) {
    this.id = id;
    this.children = false;
}
var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);
var node6 = new Node(6);
var node7 = new Node(7);
var node8 = new Node(8);
var node9 = new Node(9);
var node10 = new Node(10);
var node11 = new Node(11);
node1.children = [node2, node3, node4];
node2.children = [node5, node6];
node4.children = [node7];
node7.children = [node8, node9, node10, node11];

function getNodeById(oParent, id) {
    if (oParent.id === id)
        return oParent;
    if (oParent.children) {
        var result = false;
        var aParent = oParent.children;
        for (var i = 0; i < aParent.length; i++) {
            result = getNodeById(aParent[i], id);
            if (result) {
                console.log(aParent[i]);
                return result;
            }
        }
    }
    return false;
}
var a = getNodeById(node1, 11);
console.log('最终结果就是', a);

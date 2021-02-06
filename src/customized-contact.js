function isContacting(a, b) {
    var distance = a.width / 2 + b.width / 2
    var dx = a.x - b.x
    var dy = a.y - b.y
    return dx * dx + dy * dy <= distance * distance + 1e-5
}
var children = cc.find("Canvas/fruitNode").children
var parent = Array(children.length)
var count = Array(children.length)
for (const i in children) {
    parent[i] = i
    count[i] = 1
}
function getPar(i) {
    if (parent[i] == i) {
        return i
    }
    return parent[i] = getPar(parent[i])
}
function merge(a, b) {
    var aPar = getPar(a)
    var bPar = getPar(b)
    if (aPar == bPar) {
        return
    }

    parent[bPar] = parent[aPar]
    count[aPar] += count[bPar]
}
children.forEach((child, index) => {
    var childFruitNumber = child.getComponent("fruitData").fruitNumber;
    for(var i = index + 1; i < children.length; i++) {
        var curFruitNumber = children[i].getComponent("fruitData").fruitNumber;
        if(childFruitNumber == curFruitNumber && isContacting(child, children[i])) {
            merge(index, i)
        }
    }
})
console.log(parent, count)
var ijk = i
count.forEach((cnt, i) => {
    if (getPar(i) != i || cnt < 3) {
        return
    }
    if (exist[children[i]._id]) {
        return
    }

    count.forEach((_, ii) => {
        if(getPar(ii) != i || exist[children[ii]._id]) {
            return
        }
        exist[children[ii]._id] = 1

        children[ii].getComponent(cc.PhysicsCircleCollider).radius = 0
        children[ii].getComponent(cc.PhysicsCircleCollider).apply()
        children[ii].active = !0
        children[ii].destroy()
    })
    exist[children[i]._id] = 1
    var curNode = children[i]
    var fruitNumber = curNode.getComponent("fruitData").fruitNumber
    cc.tween(t.node).to(.1, {position: n.node.position})
    ijk.default.Instance.createFruitSui(fruitNumber, curNode.position)
    ijk.default.Instance.createFruitL(fruitNumber, curNode.position, curNode.width)
    ijk.default.Instance.createLevelUpFruit(fruitNumber + 1, curNode.position)

})

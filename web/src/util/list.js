let listAdd = (list, index, element) => list.slice(0, index).concat(element).concat(list.slice(index));

export {
    listAdd
}

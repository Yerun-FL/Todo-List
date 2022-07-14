const initialState = {
  list: [],
  dropdown_val: "All",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AddTodo":
      const { id, data, priority, completed } = action.payload;
      return {
        ...state,
        list: [
          {
            id: id,
            data: data,
            priority: priority,
            completed: completed,
          },
          ...state.list,
        ],
      };
    case "EditTodo":
      return {
        ...state,
        list: action.payload.editedList,
      };

    case "FilterPriority":
      // console.log(action.payload);
      return {
        ...state,
        dropdown_val: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

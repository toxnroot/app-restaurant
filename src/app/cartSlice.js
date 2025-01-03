import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; // زيادة الكمية إذا كان المنتج موجودًا
            } else {
                state.items.push(action.payload); // إضافة المنتج الجديد
            }
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1); // حذف العنصر من السلة
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1; // زيادة الكمية
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1; // تقليل الكمية
                } else {
                    state.items = state.items.filter(i => i.id !== action.payload); // حذف العنصر إذا كانت الكمية 1
                }
            }
        },
        setCart: (state, action) => {
            state.items = action.payload; // تحديث السلة بالكامل
        },
    },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;

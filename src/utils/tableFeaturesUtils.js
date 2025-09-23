export const tableFeaturesUtils = {
    
    
    sortData : (arr, key, order = 'asc') => {
        const sorted = [...arr].sort((a, b) => {
            const x = a[key].toLowerCase();
            const y = b[key].toLowerCase();

            if (x < y) return order === "asc" ? -1 : 1;
            if (x > y) return order === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    },


    filterData: (arr, status) => {
        if (status === "All") return arr;
        return arr.filter((item) => item.status === status);
    },


    searchData: (arr, text) => {
        if (!text.trim()) return arr;

        const name = text.toLowerCase();
        return arr.filter(
            (data) =>
            data.name.toLowerCase().includes(name) ||
            data.email.toLowerCase().includes(name)
        );
    },

}
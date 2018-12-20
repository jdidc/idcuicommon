export default {
    methods: {
        trigger(method, ...args) {
            const { $refs: { grid } } = this;
            if (grid && grid[method]) {
                grid[method](...args);
            }
        },

        exportCsv(...args) {
            if (arguments.length === 0) {
                this.trigger('exportCsv', {});
            }
            this.trigger('exportCsv', ...args);
        },

        clearCurrentRow() {
            this.trigger('clearCurrentRow');
        }
    }
};

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Griddle"] = factory(require("react"));
	else
		root["Griddle"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   Griddle - Simple Grid Component for React
	   https://github.com/DynamicTyped/Griddle
	   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var React = __webpack_require__(2);
	var GridTable = __webpack_require__(3);
	var GridFilter = __webpack_require__(38);
	var GridPagination = __webpack_require__(39);
	var GridSettings = __webpack_require__(40);
	var GridNoData = __webpack_require__(41);
	var GridRow = __webpack_require__(42);
	var CustomRowComponentContainer = __webpack_require__(43);
	var CustomPaginationContainer = __webpack_require__(44);
	var ColumnProperties = __webpack_require__(4);
	var RowProperties = __webpack_require__(36);
	var deep = __webpack_require__(37);
	var _ = __webpack_require__(33);

	var Griddle = React.createClass({
	    displayName: 'Griddle',

	    statics: {
	        GridTable: GridTable,
	        GridFilter: GridFilter,
	        GridPagination: GridPagination,
	        GridSettings: GridSettings,
	        GridRow: GridRow
	    },
	    columnSettings: null,
	    rowSettings: null,
	    getDefaultProps: function getDefaultProps() {
	        return {
	            'columns': [],
	            'columnMetadata': [],
	            'rowMetadata': null,
	            'resultsPerPage': 5,
	            'results': [], // Used if all results are already loaded.
	            'initialSort': '',
	            'initialSortAscending': true,
	            'gridClassName': '',
	            'tableClassName': '',
	            'customRowComponentClassName': '',
	            'settingsText': 'Settings',
	            'filterPlaceholderText': 'Filter Results',
	            'nextText': 'Next',
	            'previousText': 'Previous',
	            'maxRowsText': 'Rows per page',
	            'enableCustomFormatText': 'Enable Custom Formatting',
	            //this column will determine which column holds subgrid data
	            //it will be passed through with the data object but will not be rendered
	            'childrenColumnName': 'children',
	            //Any column in this list will be treated as metadata and will be passed through with the data but won't be rendered
	            'metadataColumns': [],
	            'showFilter': false,
	            'showSettings': false,
	            'useCustomRowComponent': false,
	            'useCustomGridComponent': false,
	            'useCustomPagerComponent': false,
	            'useGriddleStyles': true,
	            'useGriddleIcons': true,
	            'customRowComponent': null,
	            'customGridComponent': null,
	            'customPagerComponent': {},
	            'enableToggleCustom': false,
	            'noDataMessage': 'There is no data to display.',
	            'noDataClassName': 'griddle-nodata',
	            'customNoDataComponent': null,
	            'showTableHeading': true,
	            'showPager': true,
	            'useFixedHeader': false,
	            'useExternal': false,
	            'externalSetPage': null,
	            'externalChangeSort': null,
	            'externalSetFilter': null,
	            'externalSetPageSize': null,
	            'externalMaxPage': null,
	            'externalCurrentPage': null,
	            'externalSortColumn': null,
	            'externalSortAscending': true,
	            'externalLoadingComponent': null,
	            'externalIsLoading': false,
	            'enableInfiniteScroll': false,
	            'bodyHeight': null,
	            'paddingHeight': 5,
	            'rowHeight': 25,
	            'infiniteScrollLoadTreshold': 50,
	            'useFixedLayout': true,
	            'isSubGriddle': false,
	            'enableSort': true,
	            'onRowClick': null,
	            /* css class names */
	            'sortAscendingClassName': 'sort-ascending',
	            'sortDescendingClassName': 'sort-descending',
	            'parentRowCollapsedClassName': 'parent-row',
	            'parentRowExpandedClassName': 'parent-row expanded',
	            'settingsToggleClassName': 'settings',
	            'nextClassName': 'griddle-next',
	            'previousClassName': 'griddle-previous',
	            'headerStyles': {},
	            /* icon components */
	            'sortAscendingComponent': ' ▲',
	            'sortDescendingComponent': ' ▼',
	            'sortDefaultComponent': null,
	            'parentRowCollapsedComponent': '▶',
	            'parentRowExpandedComponent': '▼',
	            'settingsIconComponent': '',
	            'nextIconComponent': '',
	            'previousIconComponent': '',
	            'isMultipleSelection': false, //currently does not support subgrids
	            'selectedRowIds': [],
	            'uniqueIdentifier': 'id'
	        };
	    },
	    propTypes: {
	        isMultipleSelection: React.PropTypes.bool,
	        selectedRowIds: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.number), React.PropTypes.arrayOf(React.PropTypes.string)]),
	        uniqueIdentifier: React.PropTypes.string
	    },
	    /* if we have a filter display the max page and results accordingly */
	    setFilter: function setFilter(filter) {
	        if (this.props.useExternal) {
	            this.props.externalSetFilter(filter);
	            return;
	        }

	        var that = this,
	            updatedState = {
	            page: 0,
	            filter: filter
	        };

	        // Obtain the state results.
	        updatedState.filteredResults = _.filter(this.props.results, function (item) {
	            var arr = deep.keys(item);
	            for (var i = 0; i < arr.length; i++) {
	                if ((deep.getAt(item, arr[i]) || '').toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
	                    return true;
	                }
	            }

	            return false;
	        });

	        // Update the max page.
	        updatedState.maxPage = that.getMaxPage(updatedState.filteredResults);

	        //if filter is null or undefined reset the filter.
	        if (_.isUndefined(filter) || _.isNull(filter) || _.isEmpty(filter)) {
	            updatedState.filter = filter;
	            updatedState.filteredResults = null;
	        }

	        // Set the state.
	        that.setState(updatedState);

	        this._resetSelectedRows();
	    },
	    setPageSize: function setPageSize(size) {
	        if (this.props.useExternal) {
	            this.props.externalSetPageSize(size);
	            return;
	        }

	        //make this better.
	        this.props.resultsPerPage = size;
	        this.setMaxPage();
	    },
	    toggleColumnChooser: function toggleColumnChooser() {
	        this.setState({
	            showColumnChooser: !this.state.showColumnChooser
	        });
	    },
	    toggleCustomComponent: function toggleCustomComponent() {
	        if (this.state.customComponentType === 'grid') {
	            this.setProps({
	                useCustomGridComponent: !this.props.useCustomGridComponent
	            });
	        } else if (this.state.customComponentType === 'row') {
	            this.setProps({
	                useCustomRowComponent: !this.props.useCustomRowComponent
	            });
	        }
	    },
	    getMaxPage: function getMaxPage(results, totalResults) {
	        if (this.props.useExternal) {
	            return this.props.externalMaxPage;
	        }

	        if (!totalResults) {
	            totalResults = (results || this.getCurrentResults()).length;
	        }
	        var maxPage = Math.ceil(totalResults / this.props.resultsPerPage);
	        return maxPage;
	    },
	    setMaxPage: function setMaxPage(results) {
	        var maxPage = this.getMaxPage(results);
	        //re-render if we have new max page value
	        if (this.state.maxPage !== maxPage) {
	            this.setState({ page: 0, maxPage: maxPage, filteredColumns: this.columnSettings.filteredColumns });
	        }
	    },
	    setPage: function setPage(number) {
	        if (this.props.useExternal) {
	            this.props.externalSetPage(number);
	            return;
	        }

	        //check page size and move the filteredResults to pageSize * pageNumber
	        if (number * this.props.resultsPerPage <= this.props.resultsPerPage * this.state.maxPage) {
	            var that = this,
	                state = {
	                page: number
	            };

	            that.setState(state);
	        }

	        //When infinite scrolling is enabled, uncheck the "select all" checkbox, since more unchecked rows will be appended at the end
	        if (this.props.enableInfiniteScroll) {
	            this.setState({
	                isSelectAllChecked: false
	            });
	        } else {
	            //When the paging is done on the server, the previously selected rows on a certain page might not
	            // coincide with the new rows on that exact page page, if moving back and forth. Better reset the selection
	            this._resetSelectedRows();
	        }
	    },
	    setColumns: function setColumns(columns) {
	        this.columnSettings.filteredColumns = _.isArray(columns) ? columns : [columns];

	        this.setState({
	            filteredColumns: this.columnSettings.filteredColumns
	        });
	    },
	    nextPage: function nextPage() {
	        var currentPage = this.getCurrentPage();
	        if (currentPage < this.getCurrentMaxPage() - 1) {
	            this.setPage(currentPage + 1);
	        }
	    },
	    previousPage: function previousPage() {
	        var currentPage = this.getCurrentPage();
	        if (currentPage > 0) {
	            this.setPage(currentPage - 1);
	        }
	    },
	    changeSort: function changeSort(sort) {
	        if (this.props.enableSort === false) {
	            return;
	        }
	        if (this.props.useExternal) {
	            this.props.externalChangeSort(sort, this.props.externalSortColumn === sort ? !this.props.externalSortAscending : true);
	            return;
	        }

	        var that = this,
	            state = {
	            page: 0,
	            sortColumn: sort,
	            sortAscending: true
	        };

	        // If this is the same column, reverse the sort.
	        if (this.state.sortColumn == sort) {
	            state.sortAscending = !this.state.sortAscending;
	        }

	        this.setState(state);

	        //When the sorting is done on the server, the previously selected rows might not correspond with the new ones.
	        //Better reset the selection
	        this._resetSelectedRows();
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setMaxPage(nextProps.results);

	        if (nextProps.columns !== this.columnSettings.filteredColumns) {
	            this.columnSettings.filteredColumns = nextProps.columns;
	        }

	        if (nextProps.selectedRowIds) {
	            var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true);

	            this.setState({
	                isSelectAllChecked: this._getAreAllRowsChecked(nextProps.selectedRowIds, _.pluck(visibleRows, this.props.uniqueIdentifier)),
	                selectedRowIds: nextProps.selectedRowIds
	            });
	        }
	    },
	    getInitialState: function getInitialState() {
	        var state = {
	            maxPage: 0,
	            page: 0,
	            filteredResults: null,
	            filteredColumns: [],
	            filter: '',
	            sortColumn: this.props.initialSort,
	            sortAscending: this.props.initialSortAscending,
	            showColumnChooser: false,
	            isSelectAllChecked: false,
	            selectedRowIds: this.props.selectedRowIds
	        };

	        return state;
	    },
	    componentWillMount: function componentWillMount() {
	        this.verifyExternal();
	        this.verifyCustom();

	        console.log('FS', this.props.columns);

	        this.columnSettings = new ColumnProperties(this.props.results.length > 0 ? deep.keys(this.props.results[0]) : [], this.props.columns, this.props.childrenColumnName, this.props.columnMetadata, this.props.metadataColumns);

	        this.rowSettings = new RowProperties(this.props.rowMetadata, this.props.useCustomTableRowComponent && this.props.customTableRowComponent ? this.props.customTableRowComponent : GridRow, this.props.useCustomTableRowComponent);

	        this.setMaxPage();

	        //don't like the magic strings
	        if (this.props.useCustomGridComponent === true) {
	            this.setState({
	                customComponentType: 'grid'
	            });
	        } else if (this.props.useCustomRowComponent === true) {
	            this.setState({
	                customComponentType: 'row'
	            });
	        } else {
	            this.setState({
	                filteredColumns: this.columnSettings.filteredColumns
	            });
	        }
	    },
	    //todo: clean these verify methods up
	    verifyExternal: function verifyExternal() {
	        if (this.props.useExternal === true) {
	            //hooray for big ugly nested if
	            if (this.props.externalSetPage === null) {
	                console.error('useExternal is set to true but there is no externalSetPage function specified.');
	            }

	            if (this.props.externalChangeSort === null) {
	                console.error('useExternal is set to true but there is no externalChangeSort function specified.');
	            }

	            if (this.props.externalSetFilter === null) {
	                console.error('useExternal is set to true but there is no externalSetFilter function specified.');
	            }

	            if (this.props.externalSetPageSize === null) {
	                console.error('useExternal is set to true but there is no externalSetPageSize function specified.');
	            }

	            if (this.props.externalMaxPage === null) {
	                console.error('useExternal is set to true but externalMaxPage is not set.');
	            }

	            if (this.props.externalCurrentPage === null) {
	                console.error('useExternal is set to true but externalCurrentPage is not set. Griddle will not page correctly without that property when using external data.');
	            }
	        }
	    },
	    verifyCustom: function verifyCustom() {
	        if (this.props.useCustomGridComponent === true && this.props.customGridComponent === null) {
	            console.error('useCustomGridComponent is set to true but no custom component was specified.');
	        }
	        if (this.props.useCustomRowComponent === true && this.props.customRowComponent === null) {
	            console.error('useCustomRowComponent is set to true but no custom component was specified.');
	        }
	        if (this.props.useCustomGridComponent === true && this.props.useCustomRowComponent === true) {
	            console.error('Cannot currently use both customGridComponent and customRowComponent.');
	        }
	    },
	    getDataForRender: function getDataForRender(data, cols, pageList) {
	        var that = this;
	        //get the correct page size
	        if (this.state.sortColumn !== '' || this.props.initialSort !== '') {
	            var sortProperty = _.where(this.props.columnMetadata, { columnName: this.state.sortColumn });
	            sortProperty = sortProperty.length > 0 && sortProperty[0].hasOwnProperty('sortProperty') && sortProperty[0]['sortProperty'] || null;

	            data = _.sortBy(data, function (item) {
	                return sortProperty ? deep.getAt(item, that.state.sortColumn || that.props.initialSort)[sortProperty] : deep.getAt(item, that.state.sortColumn || that.props.initialSort);
	            });

	            if (this.state.sortAscending === false) {
	                data.reverse();
	            }
	        }

	        var currentPage = this.getCurrentPage();

	        if (!this.props.useExternal && pageList && this.props.resultsPerPage * (currentPage + 1) <= this.props.resultsPerPage * this.state.maxPage && currentPage >= 0) {
	            if (this.isInfiniteScrollEnabled()) {
	                // If we're doing infinite scroll, grab all results up to the current page.
	                data = _.first(data, (currentPage + 1) * this.props.resultsPerPage);
	            } else {
	                //the 'rest' is grabbing the whole array from index on and the 'initial' is getting the first n results
	                var rest = _.drop(data, currentPage * this.props.resultsPerPage);
	                data = (_.dropRight || _.initial)(rest, rest.length - this.props.resultsPerPage);
	            }
	        }

	        var meta = this.columnSettings.getMetadataColumns;

	        var transformedData = [];

	        for (var i = 0; i < data.length; i++) {
	            var mappedData = data[i];

	            if (typeof mappedData[that.props.childrenColumnName] !== 'undefined' && mappedData[that.props.childrenColumnName].length > 0) {
	                //internally we're going to use children instead of whatever it is so we don't have to pass the custom name around
	                mappedData['children'] = that.getDataForRender(mappedData[that.props.childrenColumnName], cols, false);

	                if (that.props.childrenColumnName !== 'children') {
	                    delete mappedData[that.props.childrenColumnName];
	                }
	            }

	            transformedData.push(mappedData);
	        }
	        return transformedData;
	    },
	    //this is the current results
	    getCurrentResults: function getCurrentResults() {
	        return this.state.filteredResults || this.props.results;
	    },
	    getCurrentPage: function getCurrentPage() {
	        return this.props.externalCurrentPage || this.state.page;
	    },
	    getCurrentSort: function getCurrentSort() {
	        return this.props.useExternal ? this.props.externalSortColumn : this.state.sortColumn;
	    },
	    getCurrentSortAscending: function getCurrentSortAscending() {
	        return this.props.useExternal ? this.props.externalSortAscending : this.state.sortAscending;
	    },
	    getCurrentMaxPage: function getCurrentMaxPage() {
	        return this.props.useExternal ? this.props.externalMaxPage : this.state.maxPage;
	    },
	    //This takes the props relating to sort and puts them in one object
	    getSortObject: function getSortObject() {
	        return {
	            enableSort: this.props.enableSort,
	            changeSort: this.changeSort,
	            sortColumn: this.getCurrentSort(),
	            sortAscending: this.getCurrentSortAscending(),
	            sortAscendingClassName: this.props.sortAscendingClassName,
	            sortDescendingClassName: this.props.sortDescendingClassName,
	            sortAscendingComponent: this.props.sortAscendingComponent,
	            sortDescendingComponent: this.props.sortDescendingComponent,
	            sortDefaultComponent: this.props.sortDefaultComponent
	        };
	    },
	    _toggleSelectAll: function _toggleSelectAll() {

	        var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true),
	            newIsSelectAllChecked = !this.state.isSelectAllChecked,
	            newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

	        _.each(visibleRows, function (row) {
	            this._updateSelectedRowIds(row[this.props.uniqueIdentifier], newSelectedRowIds, newIsSelectAllChecked);
	        }, this);

	        this.setState({
	            isSelectAllChecked: newIsSelectAllChecked,
	            selectedRowIds: newSelectedRowIds
	        });
	    },
	    _toggleSelectRow: function _toggleSelectRow(row, isChecked) {

	        var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true),
	            newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

	        this._updateSelectedRowIds(row[this.props.uniqueIdentifier], newSelectedRowIds, isChecked);

	        this.setState({
	            isSelectAllChecked: this._getAreAllRowsChecked(newSelectedRowIds, _.pluck(visibleRows, this.props.uniqueIdentifier)),
	            selectedRowIds: newSelectedRowIds
	        });
	    },
	    _updateSelectedRowIds: function _updateSelectedRowIds(id, selectedRowIds, isChecked) {

	        var isFound;

	        if (isChecked) {
	            isFound = _.find(selectedRowIds, function (item) {
	                return id === item;
	            });

	            if (isFound === undefined) {
	                selectedRowIds.push(id);
	            }
	        } else {
	            selectedRowIds.splice(selectedRowIds.indexOf(id), 1);
	        }
	    },
	    _getIsSelectAllChecked: function _getIsSelectAllChecked() {

	        return this.state.isSelectAllChecked;
	    },
	    _getAreAllRowsChecked: function _getAreAllRowsChecked(selectedRowIds, visibleRowIds) {

	        var i, isFound;

	        if (selectedRowIds.length !== visibleRowIds.length) {
	            return false;
	        }

	        for (i = 0; i < selectedRowIds.length; i++) {
	            isFound = _.find(visibleRowIds, function (visibleRowId) {
	                return selectedRowIds[i] === visibleRowId;
	            });

	            if (isFound === undefined) {
	                return false;
	            }
	        }

	        return true;
	    },
	    _getIsRowChecked: function _getIsRowChecked(row) {

	        return this.state.selectedRowIds.indexOf(row[this.props.uniqueIdentifier]) > -1 ? true : false;
	    },
	    getSelectedRowIds: function getSelectedRowIds() {

	        return this.state.selectedRowIds;
	    },
	    _resetSelectedRows: function _resetSelectedRows() {

	        this.setState({
	            isSelectAllChecked: false,
	            selectedRowIds: []
	        });
	    },
	    //This takes the props relating to multiple selection and puts them in one object
	    getMultipleSelectionObject: function getMultipleSelectionObject() {

	        return {
	            isMultipleSelection: _.find(this.props.results, function (result) {
	                return 'children' in result;
	            }) ? false : this.props.isMultipleSelection, //does not support subgrids
	            toggleSelectAll: this._toggleSelectAll,
	            getIsSelectAllChecked: this._getIsSelectAllChecked,

	            toggleSelectRow: this._toggleSelectRow,
	            getSelectedRowIds: this.getSelectedRowIds,
	            getIsRowChecked: this._getIsRowChecked
	        };
	    },
	    isInfiniteScrollEnabled: function isInfiniteScrollEnabled() {
	        // If a custom pager is included, don't allow for infinite scrolling.
	        if (this.props.useCustomPagerComponent) {
	            return false;
	        }

	        // Otherwise, send back the property.
	        return this.props.enableInfiniteScroll;
	    },
	    getClearFixStyles: function getClearFixStyles() {
	        return {
	            clear: 'both',
	            display: 'table',
	            width: '100%'
	        };
	    },
	    getSettingsStyles: function getSettingsStyles() {
	        return {
	            'float': 'left',
	            width: '50%',
	            textAlign: 'right'
	        };
	    },
	    getFilterStyles: function getFilterStyles() {
	        return {
	            'float': 'left',
	            width: '50%',
	            textAlign: 'left',
	            color: '#222',
	            minHeight: '1px'
	        };
	    },
	    getFilter: function getFilter() {
	        return this.props.showFilter && this.props.useCustomGridComponent === false ? React.createElement(GridFilter, { changeFilter: this.setFilter, placeholderText: this.props.filterPlaceholderText }) : '';
	    },
	    getSettings: function getSettings() {
	        return this.props.showSettings ? React.createElement('button', { type: 'button', className: this.props.settingsToggleClassName, onClick: this.toggleColumnChooser,
	            style: this.props.useGriddleStyles ? { background: 'none', border: 'none', padding: 0, margin: 0, fontSize: 14 } : null }, this.props.settingsText, ' ', this.props.settingsIconComponent) : '';
	    },
	    getTopSection: function getTopSection(filter, settings) {
	        if (this.props.showFilter === false && this.props.showSettings === false) {
	            return '';
	        }

	        var filterStyles = null,
	            settingsStyles = null,
	            topContainerStyles = null;

	        if (this.props.useGriddleStyles) {
	            filterStyles = this.getFilterStyles();
	            settingsStyles = this.getSettingsStyles();

	            topContainerStyles = this.getClearFixStyles();
	        }

	        return React.createElement('div', { className: 'top-section', style: topContainerStyles }, React.createElement('div', { className: 'griddle-filter', style: filterStyles }, filter), React.createElement('div', { className: 'griddle-settings-toggle', style: settingsStyles }, settings));
	    },
	    getPagingSection: function getPagingSection(currentPage, maxPage) {
	        if ((this.props.showPager && !this.isInfiniteScrollEnabled() && !this.props.useCustomGridComponent) === false) {
	            return '';
	        }

	        return React.createElement('div', { className: 'griddle-footer' }, this.props.useCustomPagerComponent ? React.createElement(CustomPaginationContainer, { next: this.nextPage, previous: this.previousPage, currentPage: currentPage, maxPage: maxPage, setPage: this.setPage, nextText: this.props.nextText, previousText: this.props.previousText, customPagerComponent: this.props.customPagerComponent }) : React.createElement(GridPagination, { useGriddleStyles: this.props.useGriddleStyles, next: this.nextPage, previous: this.previousPage, nextClassName: this.props.nextClassName, nextIconComponent: this.props.nextIconComponent, previousClassName: this.props.previousClassName, previousIconComponent: this.props.previousIconComponent, currentPage: currentPage, maxPage: maxPage, setPage: this.setPage, nextText: this.props.nextText, previousText: this.props.previousText }));
	    },
	    getColumnSelectorSection: function getColumnSelectorSection(keys, cols) {
	        return this.state.showColumnChooser ? React.createElement(GridSettings, { columns: keys, selectedColumns: cols, setColumns: this.setColumns, settingsText: this.props.settingsText,
	            settingsIconComponent: this.props.settingsIconComponent, maxRowsText: this.props.maxRowsText, setPageSize: this.setPageSize,
	            showSetPageSize: !this.props.useCustomGridComponent, resultsPerPage: this.props.resultsPerPage, enableToggleCustom: this.props.enableToggleCustom,
	            toggleCustomComponent: this.toggleCustomComponent, useCustomComponent: this.props.useCustomRowComponent || this.props.useCustomGridComponent,
	            useGriddleStyles: this.props.useGriddleStyles, enableCustomFormatText: this.props.enableCustomFormatText, columnMetadata: this.props.columnMetadata }) : '';
	    },
	    getCustomGridSection: function getCustomGridSection() {
	        return React.createElement(this.props.customGridComponent, { data: this.props.results, className: this.props.customGridComponentClassName });
	    },
	    getCustomRowSection: function getCustomRowSection(data, cols, meta, pagingContent) {
	        return React.createElement('div', null, React.createElement(CustomRowComponentContainer, { data: data, columns: cols, metadataColumns: meta,
	            className: this.props.customRowComponentClassName, customComponent: this.props.customRowComponent,
	            style: this.getClearFixStyles() }), this.props.showPager && pagingContent);
	    },
	    getStandardGridSection: function getStandardGridSection(data, cols, meta, pagingContent, hasMorePages) {
	        var sortProperties = this.getSortObject();
	        var multipleSelectionProperties = this.getMultipleSelectionObject();

	        return React.createElement('div', { className: 'griddle-body' }, React.createElement(GridTable, { useGriddleStyles: this.props.useGriddleStyles,
	            columnSettings: this.columnSettings,
	            rowSettings: this.rowSettings,
	            sortSettings: sortProperties,
	            multipleSelectionSettings: multipleSelectionProperties,
	            isSubGriddle: this.props.isSubGriddle,
	            useGriddleIcons: this.props.useGriddleIcons,
	            useFixedLayout: this.props.useFixedLayout,
	            showPager: this.props.showPager,
	            pagingContent: pagingContent,
	            data: data,
	            className: this.props.tableClassName,
	            enableInfiniteScroll: this.isInfiniteScrollEnabled(),
	            nextPage: this.nextPage,
	            showTableHeading: this.props.showTableHeading,
	            useFixedHeader: this.props.useFixedHeader,
	            parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
	            parentRowExpandedClassName: this.props.parentRowExpandedClassName,
	            parentRowCollapsedComponent: this.props.parentRowCollapsedComponent,
	            parentRowExpandedComponent: this.props.parentRowExpandedComponent,
	            bodyHeight: this.props.bodyHeight,
	            paddingHeight: this.props.paddingHeight,
	            rowHeight: this.props.rowHeight,
	            infiniteScrollLoadTreshold: this.props.infiniteScrollLoadTreshold,
	            externalLoadingComponent: this.props.externalLoadingComponent,
	            externalIsLoading: this.props.externalIsLoading,
	            hasMorePages: hasMorePages,
	            onRowClick: this.props.onRowClick }));
	    },
	    getContentSection: function getContentSection(data, cols, meta, pagingContent, hasMorePages) {
	        if (this.props.useCustomGridComponent && this.props.customGridComponent !== null) {
	            return this.getCustomGridSection();
	        } else if (this.props.useCustomRowComponent) {
	            return this.getCustomRowSection(data, cols, meta, pagingContent);
	        } else {
	            return this.getStandardGridSection(data, cols, meta, pagingContent, hasMorePages);
	        }
	    },
	    getNoDataSection: function getNoDataSection(gridClassName, topSection) {
	        var myReturn = null;
	        if (this.props.customNoDataComponent != null) {
	            myReturn = React.createElement('div', { className: gridClassName }, React.createElement(this.props.customNoDataComponent, null));

	            return myReturn;
	        }

	        myReturn = React.createElement('div', { className: gridClassName }, topSection, React.createElement(GridNoData, { noDataMessage: this.props.noDataMessage }));
	        return myReturn;
	    },
	    shouldShowNoDataSection: function shouldShowNoDataSection(results) {
	        return this.props.useExternal === false && (typeof results === 'undefined' || results.length === 0) || this.props.useExternal === true && this.props.externalIsLoading === false && results.length === 0;
	    },
	    render: function render() {
	        var that = this,
	            results = this.getCurrentResults(); // Attempt to assign to the filtered results, if we have any.

	        var headerTableClassName = this.props.tableClassName + ' table-header';

	        //figure out if we want to show the filter section
	        var filter = this.getFilter();
	        var settings = this.getSettings();

	        //if we have neither filter or settings don't need to render this stuff
	        var topSection = this.getTopSection(filter, settings);

	        var keys = [];
	        var cols = this.columnSettings.getColumns();

	        //figure out which columns are displayed and show only those
	        var data = this.getDataForRender(results, cols, true);

	        var meta = this.columnSettings.getMetadataColumns();

	        // Grab the column keys from the first results
	        keys = deep.keys(_.omit(results[0], meta));

	        // sort keys by order
	        keys = this.columnSettings.orderColumns(keys);

	        // Grab the current and max page values.
	        var currentPage = this.getCurrentPage();
	        var maxPage = this.getCurrentMaxPage();

	        // Determine if we need to enable infinite scrolling on the table.
	        var hasMorePages = currentPage + 1 < maxPage;

	        // Grab the paging content if it's to be displayed
	        var pagingContent = this.getPagingSection(currentPage, maxPage);

	        var resultContent = this.getContentSection(data, cols, meta, pagingContent, hasMorePages);

	        var columnSelector = this.getColumnSelectorSection(keys, cols);

	        var gridClassName = this.props.gridClassName.length > 0 ? 'griddle ' + this.props.gridClassName : 'griddle';
	        //add custom to the class name so we can style it differently
	        gridClassName += this.props.useCustomRowComponent ? ' griddle-custom' : '';

	        if (this.shouldShowNoDataSection(results)) {
	            gridClassName += this.props.noDataClassName && this.props.noDataClassName.length > 0 ? ' ' + this.props.noDataClassName : '';
	            return this.getNoDataSection(gridClassName, topSection);
	        }

	        return React.createElement('div', { className: gridClassName }, topSection, columnSelector, React.createElement('div', { className: 'griddle-container', style: this.props.useGriddleStyles && !this.props.isSubGriddle ? { border: '1px solid #DDD' } : null }, resultContent));
	    }
	});

	module.exports = Griddle;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var _Object$create = __webpack_require__(17)['default'];

	var React = __webpack_require__(2);
	var GridTitle = __webpack_require__(34);
	var GridRowContainer = __webpack_require__(35);
	var ColumnProperties = __webpack_require__(4);
	var RowProperties = __webpack_require__(36);
	var _ = __webpack_require__(33);
	var deep = __webpack_require__(37);

	var GridTable = React.createClass({
	  displayName: 'GridTable',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      'data': [],
	      'columnSettings': null,
	      'rowSettings': null,
	      'sortSettings': null,
	      'multipleSelectionSettings': null,
	      'className': '',
	      'enableInfiniteScroll': false,
	      'nextPage': null,
	      'hasMorePages': false,
	      'useFixedHeader': false,
	      'useFixedLayout': true,
	      'paddingHeight': null,
	      'rowHeight': null,
	      'infiniteScrollLoadTreshold': null,
	      'bodyHeight': null,
	      'tableHeading': '',
	      'useGriddleStyles': true,
	      'useGriddleIcons': true,
	      'isSubGriddle': false,
	      'parentRowCollapsedClassName': 'parent-row',
	      'parentRowExpandedClassName': 'parent-row expanded',
	      'parentRowCollapsedComponent': '▶',
	      'parentRowExpandedComponent': '▼',
	      'externalLoadingComponent': null,
	      'externalIsLoading': false,
	      'onRowClick': null
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      scrollTop: 0,
	      scrollHeight: this.props.bodyHeight,
	      clientHeight: this.props.bodyHeight
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    // After the initial render, see if we need to load additional pages.
	    this.gridScroll();
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // After the subsequent renders, see if we need to load additional pages.
	    this.gridScroll();
	  },
	  gridScroll: function gridScroll() {
	    if (this.props.enableInfiniteScroll && !this.props.externalIsLoading) {
	      // If the scroll height is greater than the current amount of rows displayed, update the page.
	      var scrollable = this.refs.scrollable.getDOMNode();
	      var scrollTop = scrollable.scrollTop;
	      var scrollHeight = scrollable.scrollHeight;
	      var clientHeight = scrollable.clientHeight;

	      // If the scroll position changed and the difference is greater than a row height
	      if (this.props.rowHeight !== null && this.state.scrollTop !== scrollTop && Math.abs(this.state.scrollTop - scrollTop) >= this.getAdjustedRowHeight()) {
	        var newState = {
	          scrollTop: scrollTop,
	          scrollHeight: scrollHeight,
	          clientHeight: clientHeight
	        };

	        // Set the state to the new state
	        this.setState(newState);
	      }

	      // Determine the diff by subtracting the amount scrolled by the total height, taking into consideratoin
	      // the spacer's height.
	      var scrollHeightDiff = scrollHeight - (scrollTop + clientHeight) - this.props.infiniteScrollLoadTreshold;

	      // Make sure that we load results a little before reaching the bottom.
	      var compareHeight = scrollHeightDiff * 0.6;

	      if (compareHeight <= this.props.infiniteScrollLoadTreshold) {
	        this.props.nextPage();
	      }
	    }
	  },
	  verifyProps: function verifyProps() {
	    if (this.props.columnSettings === null) {
	      console.error('gridTable: The columnSettings prop is null and it shouldn\'t be');
	    }
	    if (this.props.rowSettings === null) {
	      console.error('gridTable: The rowSettings prop is null and it shouldn\'t be');
	    }
	  },
	  getAdjustedRowHeight: function getAdjustedRowHeight() {
	    return this.props.rowHeight + this.props.paddingHeight * 2; // account for padding.
	  },

	  getHiddenColumns: function getHiddenColumns() {
	    var _this = this;

	    this.verifyProps();
	    var that = this;
	    var columnStyles = null;

	    if (this.props.useGriddleStyles) {
	      columnStyles = {
	        margin: '0',
	        padding: '0 5px',
	        height: '0px',
	        backgroundColor: '#FFF'
	      };
	    }

	    var columns = this.props.columnSettings.getColumns();

	    // make sure that all the columns we need have default empty values
	    // otherwise they will get clipped
	    var defaults = _.object(columns, []);

	    // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
	    var dataView = _Object$create(this.props.data);

	    _.defaults(dataView, defaults);

	    var data = _.pairs(deep.pick(dataView, columns));

	    var nodes = data.map(function (col, index) {
	      var returnValue = null;
	      var meta = _this.props.columnSettings.getColumnMetadataByName(col[0]);

	      if (index === 0 && _this.props.isChildRow && _this.props.useGriddleStyles) {
	        columnStyles = _.extend(columnStyles, { paddingLeft: 10 });
	      }

	      if (_this.props.columnSettings.hasColumnMetadata() && typeof meta !== 'undefined') {
	        returnValue = meta == null ? returnValue : React.createElement('td', { className: meta.cssClassName, key: index, style: columnStyles });
	      }

	      return returnValue || React.createElement('td', { onClick: _this.handleClick, key: index, style: columnStyles });
	    });

	    // extra spacer col for the checkbox column.
	    if (this.props.multipleSelectionSettings.isMultipleSelection) {
	      nodes.unshift(React.createElement('td', { styles: columnStyles }));
	    }

	    return nodes;
	  },

	  getNodeContent: function getNodeContent() {
	    this.verifyProps();
	    var that = this;

	    //figure out if we need to wrap the group in one tbody or many
	    var anyHasChildren = false;

	    // If the data is still being loaded, don't build the nodes unless this is an infinite scroll table.
	    if (!this.props.externalIsLoading || this.props.enableInfiniteScroll) {
	      var nodeData = that.props.data;
	      var aboveSpacerRow = null;
	      var belowSpacerRow = null;
	      var usingDefault = false;

	      // If we have a row height specified, only render what's going to be visible.
	      if (this.props.enableInfiniteScroll && this.props.rowHeight !== null && this.refs.scrollable !== undefined) {
	        var adjustedHeight = that.getAdjustedRowHeight();
	        var visibleRecordCount = Math.ceil(that.state.clientHeight / adjustedHeight) + 2;

	        // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
	        var displayStart = Math.max(0, Math.floor(that.state.scrollTop / adjustedHeight) - visibleRecordCount * 0.25);
	        var displayEnd = Math.min(displayStart + visibleRecordCount * 1.25, this.props.data.length);

	        // Split the amount of nodes.
	        nodeData = nodeData.slice(displayStart, displayEnd + 1);

	        // Set the above and below nodes.
	        var aboveSpacerRowStyle = { height: displayStart * adjustedHeight + 'px' };
	        aboveSpacerRow = React.createElement('tr', { key: 'above-' + aboveSpacerRowStyle.height, style: aboveSpacerRowStyle }, this.getHiddenColumns());
	        var belowSpacerRowStyle = { height: (this.props.data.length - displayEnd) * adjustedHeight + 'px' };
	        belowSpacerRow = React.createElement('tr', { key: 'below-' + belowSpacerRowStyle.height, style: belowSpacerRowStyle });
	      }

	      var nodes = nodeData.map(function (row, index) {
	        var hasChildren = typeof row['children'] !== 'undefined' && row['children'].length > 0;
	        var uniqueId = that.props.rowSettings.getRowKey(row);

	        //at least one item in the group has children.
	        if (hasChildren) {
	          anyHasChildren = hasChildren;
	        }

	        return React.createElement(GridRowContainer, { useGriddleStyles: that.props.useGriddleStyles, isSubGriddle: that.props.isSubGriddle,
	          parentRowExpandedClassName: that.props.parentRowExpandedClassName, parentRowCollapsedClassName: that.props.parentRowCollapsedClassName,
	          parentRowExpandedComponent: that.props.parentRowExpandedComponent, parentRowCollapsedComponent: that.props.parentRowCollapsedComponent,
	          data: row, key: uniqueId + '-container', uniqueId: uniqueId, columnSettings: that.props.columnSettings, rowSettings: that.props.rowSettings, paddingHeight: that.props.paddingHeight,
	          multipleSelectionSettings: that.props.multipleSelectionSettings,
	          rowHeight: that.props.rowHeight, hasChildren: hasChildren, tableClassName: that.props.className, onRowClick: that.props.onRowClick });
	      });

	      // Add the spacer rows for nodes we're not rendering.
	      if (aboveSpacerRow) {
	        nodes.unshift(aboveSpacerRow);
	      }
	      if (belowSpacerRow) {
	        nodes.push(belowSpacerRow);
	      }

	      // Send back the nodes.
	      return {
	        nodes: nodes,
	        anyHasChildren: anyHasChildren
	      };
	    } else {
	      return null;
	    }
	  },
	  render: function render() {
	    var that = this;
	    var nodes = [];

	    // for if we need to wrap the group in one tbody or many
	    var anyHasChildren = false;

	    // Grab the nodes to render
	    var nodeContent = this.getNodeContent();
	    if (nodeContent) {
	      nodes = nodeContent.nodes;
	      anyHasChildren = nodeContent.anyHasChildren;
	    }

	    var gridStyle = null;
	    var loadingContent = null;
	    var tableStyle = {
	      width: '100%'
	    };

	    if (this.props.useFixedLayout) {
	      tableStyle.tableLayout = 'fixed';
	    }

	    if (this.props.enableInfiniteScroll) {
	      // If we're enabling infinite scrolling, we'll want to include the max height of the grid body + allow scrolling.
	      gridStyle = {
	        'position': 'relative',
	        'overflowY': 'scroll',
	        'height': this.props.bodyHeight + 'px',
	        'width': '100%'
	      };
	    }

	    // If we're currently loading, populate the loading content
	    if (this.props.externalIsLoading) {
	      var defaultLoadingStyle = null;
	      var defaultColSpan = null;

	      if (this.props.useGriddleStyles) {
	        defaultLoadingStyle = {
	          textAlign: 'center',
	          paddingBottom: '40px'
	        };

	        defaultColSpan = this.props.columnSettings.getVisibleColumnCount();
	      }

	      var loadingComponent = this.props.externalLoadingComponent ? React.createElement(this.props.externalLoadingComponent, null) : React.createElement('div', null, 'Loading...');

	      loadingContent = React.createElement('tbody', null, React.createElement('tr', null, React.createElement('td', { style: defaultLoadingStyle, colSpan: defaultColSpan }, loadingComponent)));
	    }

	    //construct the table heading component
	    var tableHeading = this.props.showTableHeading ? React.createElement(GridTitle, { useGriddleStyles: this.props.useGriddleStyles, useGriddleIcons: this.props.useGriddleIcons,
	      sortSettings: this.props.sortSettings,
	      multipleSelectionSettings: this.props.multipleSelectionSettings,
	      columnSettings: this.props.columnSettings,
	      rowSettings: this.props.rowSettings }) : '';

	    //check to see if any of the rows have children... if they don't wrap everything in a tbody so the browser doesn't auto do this
	    if (!anyHasChildren) {
	      nodes = React.createElement('tbody', null, nodes);
	    }

	    var pagingContent = '';
	    if (this.props.showPager) {
	      var pagingStyles = this.props.useGriddleStyles ? {
	        'padding': '0',
	        backgroundColor: '#EDEDED',
	        border: '0',
	        color: '#222'
	      } : null;
	      pagingContent = React.createElement('tbody', null, React.createElement('tr', null, React.createElement('td', { colSpan: this.props.multipleSelectionSettings.isMultipleSelection ? this.props.columnSettings.getVisibleColumnCount() + 1 : this.props.columnSettings.getVisibleColumnCount(), style: pagingStyles, className: 'footer-container' }, this.props.pagingContent)));
	    }

	    // If we have a fixed header, split into two tables.
	    if (this.props.useFixedHeader) {
	      if (this.props.useGriddleStyles) {
	        tableStyle.tableLayout = 'fixed';
	      }

	      return React.createElement('div', null, React.createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading), React.createElement('div', { ref: 'scrollable', onScroll: this.gridScroll, style: gridStyle }, React.createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, nodes, loadingContent, pagingContent)));
	    }

	    return React.createElement('div', { ref: 'scrollable', onScroll: this.gridScroll, style: gridStyle }, React.createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading, nodes, loadingContent, pagingContent));
	  }
	});

	module.exports = GridTable;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperties = __webpack_require__(5)["default"];

	var _prototypeProperties = function _prototypeProperties(child, staticProps, instanceProps) {
	  if (staticProps) _Object$defineProperties(child, staticProps);if (instanceProps) _Object$defineProperties(child.prototype, instanceProps);
	};

	var _classCallCheck = function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var _ = __webpack_require__(33);

	var ColumnProperties = (function () {
	  function ColumnProperties() {
	    var allColumns = arguments[0] === undefined ? [] : arguments[0];
	    var filteredColumns = arguments[1] === undefined ? [] : arguments[1];
	    var childrenColumnName = arguments[2] === undefined ? "children" : arguments[2];
	    var columnMetadata = arguments[3] === undefined ? [] : arguments[3];
	    var metadataColumns = arguments[4] === undefined ? [] : arguments[4];
	    _classCallCheck(this, ColumnProperties);

	    this.allColumns = allColumns;
	    this.filteredColumns = filteredColumns;
	    this.childrenColumnName = childrenColumnName;
	    this.columnMetadata = columnMetadata;
	    this.metadataColumns = metadataColumns;
	  }

	  _prototypeProperties(ColumnProperties, null, {
	    getMetadataColumns: {
	      value: function getMetadataColumns() {
	        var meta = _.map(_.where(this.columnMetadata, { visible: false }), function (item) {
	          return item.columnName;
	        });
	        if (meta.indexOf(this.childrenColumnName) < 0) {
	          meta.push(this.childrenColumnName);
	        }
	        return meta.concat(this.metadataColumns);
	      },
	      writable: true,
	      configurable: true
	    },
	    getVisibleColumnCount: {
	      value: function getVisibleColumnCount() {
	        return this.getColumns().length;
	      },
	      writable: true,
	      configurable: true
	    },
	    getColumnMetadataByName: {
	      value: function getColumnMetadataByName(name) {
	        return _.findWhere(this.columnMetadata, { columnName: name });
	      },
	      writable: true,
	      configurable: true
	    },
	    hasColumnMetadata: {
	      value: function hasColumnMetadata() {
	        return this.columnMetadata !== null && this.columnMetadata.length > 0;
	      },
	      writable: true,
	      configurable: true
	    },
	    getMetadataColumnProperty: {
	      value: function getMetadataColumnProperty(columnName, propertyName, defaultValue) {
	        var meta = this.getColumnMetadataByName(columnName);

	        //send back the default value if meta isn't there
	        if (typeof meta === "undefined" || meta === null) {
	          return defaultValue;
	        }return meta.hasOwnProperty(propertyName) ? meta[propertyName] : defaultValue;
	      },
	      writable: true,
	      configurable: true
	    },
	    orderColumns: {
	      value: function orderColumns(cols) {
	        var _this = this;
	        var ORDER_MAX = 100;

	        var orderedColumns = _.sortBy(cols, function (item) {
	          var metaItem = _.findWhere(_this.columnMetadata, { columnName: item });

	          if (typeof metaItem === "undefined" || metaItem === null || isNaN(metaItem.order)) {
	            return ORDER_MAX;
	          }

	          return metaItem.order;
	        });

	        return orderedColumns;
	      },
	      writable: true,
	      configurable: true
	    },
	    getColumns: {
	      value: function getColumns() {
	        //if we didn't set default or filter
	        var filteredColumns = this.filteredColumns.length === 0 ? this.allColumns : this.filteredColumns;

	        filteredColumns = _.difference(filteredColumns, this.metadataColumns);

	        filteredColumns = this.orderColumns(filteredColumns);

	        return filteredColumns;
	      },
	      writable: true,
	      configurable: true
	    }
	  });

	  return ColumnProperties;
	})();

	module.exports = ColumnProperties;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	module.exports = function defineProperties(T, D) {
	  return $.setDescs(T, D);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(15)['default'];

	var _Object$create = __webpack_require__(17)['default'];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(19)['default'];

	var _Object$defineProperties = __webpack_require__(5)['default'];

	var _Object$keys = __webpack_require__(8)['default'];

	var _Object$getOwnPropertyNames = __webpack_require__(13)['default'];

	var _Object$getOwnPropertySymbols = __webpack_require__(21)['default'];

	var global = typeof self != 'undefined' ? self : Function('return this')(),
	    core = {},
	    defineProperty = _Object$defineProperty,
	    hasOwnProperty = ({}).hasOwnProperty,
	    ceil = Math.ceil,
	    floor = Math.floor,
	    max = Math.max,
	    min = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!(function () {
	  try {
	    return defineProperty({}, 'a', { get: function get() {
	        return 2;
	      } }).a == 2;
	  } catch (e) {}
	})();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	}
	function simpleSet(object, key, value) {
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap) {
	  return DESC ? function (object, key, value) {
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it) {
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it) {
	  return typeof it == 'function';
	}
	function assertDefined(it) {
	  if (it == undefined) throw TypeError('Can\'t call method on  ' + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(32)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject: isObject,
	  isFunction: isFunction,
	  that: function that() {
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function toLength(it) {
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function toIndex(index, length) {
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function has(it, key) {
	    return hasOwnProperty.call(it, key);
	  },
	  create: _Object$create,
	  getProto: Object.getPrototypeOf,
	  DESC: DESC,
	  desc: desc,
	  getDesc: _Object$getOwnPropertyDescriptor,
	  setDesc: defineProperty,
	  setDescs: _Object$defineProperties,
	  getKeys: _Object$keys,
	  getNames: _Object$getOwnPropertyNames,
	  getSymbols: _Object$getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function toObject(it) {
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if (typeof __e != 'undefined') __e = core;
	if (typeof __g != 'undefined') __g = global;
	/* empty */

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(10);
	module.exports = __webpack_require__(7).core.Object.keys;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7),
	    $def = __webpack_require__(11),
	    isObject = $.isObject,
	    toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' + 'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(','), function (KEY, ID) {
	  var fn = ($.core.Object || {})[KEY] || Object[KEY],
	      forced = 0,
	      method = {};
	  method[KEY] = ID == 0 ? function freeze(it) {
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it) {
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it) {
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it) {
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it) {
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it) {
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key) {
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it) {
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it) {
	    return fn(toObject(it));
	  } : __webpack_require__(12).get;
	  try {
	    fn('z');
	  } catch (e) {
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7),
	    global = $.g,
	    core = $.core,
	    isFunction = $.isFunction;
	function ctx(fn, that) {
	  return function () {
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1; // forced
	$def.G = 2; // global
	$def.S = 4; // static
	$def.P = 8; // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source) {
	  var key,
	      own,
	      out,
	      exp,
	      isGlobal = type & $def.G,
	      isProto = type & $def.P,
	      target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {}).prototype,
	      exports = isGlobal ? core : core[name] || (core[name] = {});
	  if (isGlobal) source = name;
	  for (key in source) {
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if (isGlobal && !isFunction(target[key])) exp = source[key];
	    // bind timers to global for call from export context
	    else if (type & $def.B && own) exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if (type & $def.W && target[key] == out) !(function (C) {
	      exp = function (param) {
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    })(out);else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if (isProto) (exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	'use strict';

	var _Object$getOwnPropertyNames = __webpack_require__(13)['default'];

	var $ = __webpack_require__(7),
	    toString = ({}).toString,
	    getNames = $.getNames;

	var windowNames = typeof window == 'object' && _Object$getOwnPropertyNames ? _Object$getOwnPropertyNames(window) : [];

	function getWindowNames(it) {
	  try {
	    return getNames(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it) {
	  if (windowNames && toString.call(it) == '[object Window]') return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	__webpack_require__(10);
	module.exports = function getOwnPropertyNames(it) {
	  return $.getNames(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(16), __esModule: true };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	module.exports = function create(P, D) {
	  return $.create(P, D);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	__webpack_require__(10);
	module.exports = function getOwnPropertyDescriptor(it, key) {
	  return $.getDesc(it, key);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(23);
	module.exports = __webpack_require__(7).core.Object.getOwnPropertySymbols;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $ = __webpack_require__(7),
	    setTag = __webpack_require__(24).set,
	    uid = __webpack_require__(27),
	    shared = __webpack_require__(26),
	    $def = __webpack_require__(11),
	    $redef = __webpack_require__(28),
	    keyOf = __webpack_require__(29),
	    enumKeys = __webpack_require__(30),
	    assertObject = __webpack_require__(31).obj,
	    ObjectProto = Object.prototype,
	    DESC = $.DESC,
	    has = $.has,
	    $create = $.create,
	    getDesc = $.getDesc,
	    setDesc = $.setDesc,
	    desc = $.desc,
	    $names = __webpack_require__(12),
	    getNames = $names.get,
	    toObject = $.toObject,
	    $Symbol = $.g.Symbol,
	    setter = false,
	    TAG = uid('tag'),
	    HIDDEN = uid('hidden'),
	    _propertyIsEnumerable = ({}).propertyIsEnumerable,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    useNative = $.isFunction($Symbol);

	var setSymbolDesc = DESC ? (function () {
	  // fallback for old Android
	  try {
	    return $create(setDesc({}, HIDDEN, {
	      get: function get() {
	        return setDesc(this, HIDDEN, { value: false })[HIDDEN];
	      }
	    }))[HIDDEN] || setDesc;
	  } catch (e) {
	    return function (it, key, D) {
	      var protoDesc = getDesc(ObjectProto, key);
	      if (protoDesc) delete ObjectProto[key];
	      setDesc(it, key, D);
	      if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
	    };
	  }
	})() : setDesc;

	function wrap(tag) {
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function set(value) {
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}

	function defineProperty(it, key, D) {
	  if (D && has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = $create(D, { enumerable: desc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return setDesc(it, key, D);
	}
	function defineProperties(it, P) {
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P) {
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function propertyIsEnumerable(key) {
	  var E = _propertyIsEnumerable.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	}
	function getOwnPropertyDescriptor(it, key) {
	  var D = getDesc(it = toObject(it), key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it) {
	  var names = getNames(toObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it) {
	  var names = getNames(toObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);
	  return result;
	}

	// 19.4.1.1 Symbol([description])
	if (!useNative) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function () {
	    return this[TAG];
	  });

	  $.create = create;
	  $.setDesc = defineProperty;
	  $.getDesc = getOwnPropertyDescriptor;
	  $.setDescs = defineProperties;
	  $.getNames = $names.get = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;

	  if ($.DESC && $.FW) $redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function (it) {
	  var sym = __webpack_require__(25)(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$def($def.G + $def.W, { Symbol: $Symbol });

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7),
	    TAG = __webpack_require__(25)('toStringTag'),
	    toString = ({}).toString;
	function cof(it) {
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function (it) {
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null' : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function (it, tag, stat) {
	  if (it && !$.has(it = stat ? it : it.prototype, TAG)) $.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(7).g,
	    store = __webpack_require__(26)('wks');
	module.exports = function (name) {
	  return store[name] || (store[name] = global.Symbol && global.Symbol[name] || __webpack_require__(27).safe('Symbol.' + name));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7),
	    SHARED = '__core-js_shared__',
	    store = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var sid = 0;
	function uid(key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(7).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(7).hide;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	module.exports = function (object, el) {
	  var O = $.toObject(object),
	      keys = $.getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) if (O[key = keys[index++]] === el) return key;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	module.exports = function (it) {
	  var keys = $.getKeys(it),
	      getDesc = $.getDesc,
	      getSymbols = $.getSymbols;
	  if (getSymbols) $.each.call(getSymbols(it), function (key) {
	    if (getDesc(it, key).enumerable) keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(7);
	function assert(condition, msg1, msg2) {
	  if (!condition) throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function (it) {
	  if (!$.isFunction(it)) throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function (it) {
	  if (!$.isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) throw TypeError(name + ': use the \'new\' operator!');
	  return it;
	};
	module.exports = assert;

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function ($) {
	  $.FW = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	'use strict';

	var _Object$keys = __webpack_require__(8)['default'];

	var _Object$create = __webpack_require__(17)['default'];

	(function () {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype,
	      ObjProto = Object.prototype,
	      FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var push = ArrayProto.push,
	      slice = ArrayProto.slice,
	      toString = ObjProto.toString,
	      hasOwnProperty = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var nativeIsArray = Array.isArray,
	      nativeKeys = _Object$keys,
	      nativeBind = FuncProto.bind,
	      nativeCreate = _Object$create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function Ctor() {};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function _(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function optimizeCb(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1:
	        return function (value) {
	          return func.call(context, value);
	        };
	      case 2:
	        return function (value, other) {
	          return func.call(context, value, other);
	        };
	      case 3:
	        return function (value, index, collection) {
	          return func.call(context, value, index, collection);
	        };
	      case 4:
	        return function (accumulator, value, index, collection) {
	          return func.call(context, accumulator, value, index, collection);
	        };
	    }
	    return function () {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function cb(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function (value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
	    return function (obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function baseCreate(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor();
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function property(key) {
	    return function (obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function isArrayLike(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function (obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function (obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function (obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function (obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function (value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function (obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function (obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function (value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function (obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function (obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function (obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function (obj, iteratee, context) {
	    var result = -Infinity,
	        lastComputed = -Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function (obj, iteratee, context) {
	    var result = Infinity,
	        lastComputed = Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function (obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function (obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function (value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function (left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function group(behavior) {
	    return function (obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function (result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key]++;else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function (obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function (obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [],
	        fail = [];
	    _.each(obj, function (value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function (array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function (array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function (array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function flatten(input, shallow, strict, startIndex) {
	    var output = [],
	        idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0,
	            len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function (array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function (array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function () {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function (array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function (array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function (value) {
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function () {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function (array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function (list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function (array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function (array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0,
	        high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function (array, item, idx) {
	      var i = 0,
	          length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	          i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function (start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function (func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function bound() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function (func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function bound() {
	      var position = 0,
	          length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function (obj) {
	    var i,
	        length = arguments.length,
	        key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function (func, hasher) {
	    var memoize = function memoize(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function (func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function () {
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function (func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function later() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function () {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function (func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function later() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function (func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function (predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function () {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function (times, func) {
	    return function () {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function (times, func) {
	    var memo;
	    return function () {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = _.keys(obj),
	        length = keys.length,
	        results = {},
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys[index];
	      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function (obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function (obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj),
	        key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function (object, oiteratee, context) {
	    var result = {},
	        obj = object,
	        iteratee,
	        keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function (value, key, obj) {
	        return key in obj;
	      };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	  // Return a copy of the object without the blacklisted properties.
	  _.omit = function (obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function (value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function (prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function (obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function (obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function (object, attrs) {
	    var keys = _.keys(attrs),
	        length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor,
	          bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a),
	          key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function (a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function (obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function (obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function (obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
	    _['is' + name] = function (obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function (obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function (obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function (obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function (obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function (obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function (obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function (obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function (obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function () {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function (value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function (value) {
	    return function () {
	      return value;
	    };
	  };

	  _.noop = function () {};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function (obj) {
	    return obj == null ? function () {} : function (key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function (attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function (obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function (n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function (min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function () {
	    return new Date().getTime();
	  };

	  // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function createEscaper(map) {
	    var escaper = function escaper(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function (string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function (object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function (prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    '\'': '\'',
	    '\\': '\\',
	    '\r': 'r',
	    '\n': 'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function escapeChar(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function (text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = '__p+=\'';
	    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
	      } else if (interpolate) {
	        source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
	      } else if (evaluate) {
	        source += '\';\n' + evaluate + '\n__p+=\'';
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += '\';\n';

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function template(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function (obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function result(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function (obj) {
	    _.each(_.functions(obj), function (name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function () {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function () {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function () {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var React = __webpack_require__(2);
	var _ = __webpack_require__(33);
	var ColumnProperties = __webpack_require__(4);

	var GridTitle = React.createClass({
	    displayName: 'GridTitle',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            'columnSettings': null,
	            'rowSettings': null,
	            'sortSettings': null,
	            'multipleSelectionSettings': null,
	            'headerStyle': null,
	            'useGriddleStyles': true,
	            'useGriddleIcons': true,
	            'headerStyles': {}
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        this.verifyProps();
	    },
	    sort: function sort(event) {
	        this.props.sortSettings.changeSort(event.target.dataset.title || event.target.parentElement.dataset.title);
	    },
	    toggleSelectAll: function toggleSelectAll(event) {
	        this.props.multipleSelectionSettings.toggleSelectAll();
	    },
	    handleSelectionChange: function handleSelectionChange(event) {
	        //hack to get around warning message that's not helpful in this case
	        return;
	    },
	    verifyProps: function verifyProps() {
	        if (this.props.columnSettings === null) {
	            console.error('gridTitle: The columnSettings prop is null and it shouldn\'t be');
	        }

	        if (this.props.sortSettings === null) {
	            console.error('gridTitle: The sortSettings prop is null and it shouldn\'t be');
	        }
	    },
	    render: function render() {
	        this.verifyProps();
	        var that = this;
	        var titleStyles = null;

	        var nodes = this.props.columnSettings.getColumns().map(function (col, index) {
	            var columnSort = '';
	            var sortComponent = that.props.sortSettings.sortDefaultComponent;

	            if (that.props.sortSettings.sortColumn == col && that.props.sortSettings.sortAscending) {
	                columnSort = that.props.sortSettings.sortAscendingClassName;
	                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortAscendingComponent;
	            } else if (that.props.sortSettings.sortColumn == col && that.props.sortSettings.sortAscending === false) {
	                columnSort += that.props.sortSettings.sortDescendingClassName;
	                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortDescendingComponent;
	            }

	            var meta = that.props.columnSettings.getColumnMetadataByName(col);
	            var columnIsSortable = that.props.columnSettings.getMetadataColumnProperty(col, 'sortable', true);
	            var displayName = that.props.columnSettings.getMetadataColumnProperty(col, 'displayName', col);

	            columnSort = meta == null ? columnSort : (columnSort && columnSort + ' ' || columnSort) + that.props.columnSettings.getMetadataColumnProperty(col, 'cssClassName', '');

	            if (that.props.useGriddleStyles) {
	                titleStyles = {
	                    backgroundColor: '#EDEDEF',
	                    border: '0',
	                    borderBottom: '1px solid #DDD',
	                    color: '#222',
	                    padding: '5px',
	                    cursor: columnIsSortable ? 'pointer' : 'default'
	                };
	            }

	            return React.createElement('th', { onClick: columnIsSortable ? that.sort : null, 'data-title': col, className: columnSort, key: displayName, style: titleStyles }, displayName, sortComponent);
	        });

	        if (nodes && this.props.multipleSelectionSettings.isMultipleSelection) {
	            nodes.unshift(React.createElement('th', { key: 'selection', onClick: this.toggleSelectAll, style: titleStyles }, React.createElement('input', { type: 'checkbox', checked: this.props.multipleSelectionSettings.getIsSelectAllChecked(), onChange: this.handleSelectionChange })));
	        }

	        //Get the row from the row settings.
	        var className = that.props.rowSettings && that.props.rowSettings.getHeaderRowMetadataClass() || null;

	        return React.createElement('thead', null, React.createElement('tr', {
	            className: className,
	            style: this.props.headerStyles }, nodes));
	    }
	});

	module.exports = GridTitle;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var React = __webpack_require__(2);
	var ColumnProperties = __webpack_require__(4);

	var GridRowContainer = React.createClass({
	  displayName: 'GridRowContainer',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      'useGriddleStyles': true,
	      'useGriddleIcons': true,
	      'isSubGriddle': false,
	      'columnSettings': null,
	      'rowSettings': null,
	      'paddingHeight': null,
	      'rowHeight': null,
	      'parentRowCollapsedClassName': 'parent-row',
	      'parentRowExpandedClassName': 'parent-row expanded',
	      'parentRowCollapsedComponent': '▶',
	      'parentRowExpandedComponent': '▼',
	      'onRowClick': null,
	      'multipleSelectionSettings': null
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      'data': {},
	      'showChildren': false
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps() {
	    this.setShowChildren(false);
	  },
	  toggleChildren: function toggleChildren() {
	    this.setShowChildren(this.state.showChildren === false);
	  },
	  setShowChildren: function setShowChildren(visible) {
	    this.setState({
	      showChildren: visible
	    });
	  },
	  verifyProps: function verifyProps() {
	    if (this.props.columnSettings === null) {
	      console.error('gridRowContainer: The columnSettings prop is null and it shouldn\'t be');
	    }
	  },
	  render: function render() {
	    this.verifyProps();
	    var that = this;
	    if (typeof this.props.data === 'undefined') {
	      return React.createElement('tbody', null);
	    }
	    var arr = [];

	    var columns = this.props.columnSettings.getColumns();

	    arr.push(React.createElement(this.props.rowSettings.rowComponent, {
	      useGriddleStyles: this.props.useGriddleStyles,
	      isSubGriddle: this.props.isSubGriddle,
	      data: this.props.rowSettings.isCustom ? _.pick(this.props.data, columns) : this.props.data,
	      rowData: this.props.rowSettings.isCustom ? this.props.data : null,
	      columnSettings: this.props.columnSettings,
	      rowSettings: this.props.rowSettings,
	      hasChildren: that.props.hasChildren,
	      toggleChildren: that.toggleChildren,
	      showChildren: that.state.showChildren,
	      key: that.props.uniqueId,
	      useGriddleIcons: that.props.useGriddleIcons,
	      parentRowExpandedClassName: this.props.parentRowExpandedClassName,
	      parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
	      parentRowExpandedComponent: this.props.parentRowExpandedComponent,
	      parentRowCollapsedComponent: this.props.parentRowCollapsedComponent,
	      paddingHeight: that.props.paddingHeight,
	      rowHeight: that.props.rowHeight,
	      onRowClick: that.props.onRowClick,
	      multipleSelectionSettings: this.props.multipleSelectionSettings }));

	    var children = null;

	    if (that.state.showChildren) {
	      children = that.props.hasChildren && this.props.data['children'].map(function (row, index) {
	        if (typeof row['children'] !== 'undefined') {
	          var Griddle = __webpack_require__(1);
	          return React.createElement('tr', { style: { paddingLeft: 5 } }, React.createElement('td', { colSpan: that.props.columnSettings.getVisibleColumnCount(), className: 'griddle-parent', style: that.props.useGriddleStyles ? { border: 'none', 'padding': '0 0 0 5px' } : null }, React.createElement(Griddle, { isSubGriddle: true, results: [row], columns: that.props.columnSettings.getColumns(), tableClassName: that.props.tableClassName, parentRowExpandedClassName: that.props.parentRowExpandedClassName,
	            parentRowCollapsedClassName: that.props.parentRowCollapsedClassName,
	            showTableHeading: false, showPager: false, columnMetadata: that.props.columnMetadata,
	            parentRowExpandedComponent: that.props.parentRowExpandedComponent,
	            parentRowCollapsedComponent: that.props.parentRowCollapsedComponent,
	            paddingHeight: that.props.paddingHeight, rowHeight: that.props.rowHeight })));
	        }

	        return React.createElement(that.props.rowSettings.rowComponent, { useGriddleStyles: that.props.useGriddleStyles, isSubGriddle: that.props.isSubGriddle, data: row, columnSettings: that.props.columnSettings, isChildRow: true, columnMetadata: that.props.columnMetadata, key: that.props.rowSettings.getRowKey(row) });
	      });
	    }

	    return that.props.hasChildren === false ? arr[0] : React.createElement('tbody', null, that.state.showChildren ? arr.concat(children) : arr);
	  }
	});

	module.exports = GridRowContainer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperties = __webpack_require__(5)["default"];

	var _prototypeProperties = function _prototypeProperties(child, staticProps, instanceProps) {
	  if (staticProps) _Object$defineProperties(child, staticProps);if (instanceProps) _Object$defineProperties(child.prototype, instanceProps);
	};

	var _classCallCheck = function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var _ = __webpack_require__(33);

	var RowProperties = (function () {
	  function RowProperties() {
	    var rowMetadata = arguments[0] === undefined ? {} : arguments[0];
	    var rowComponent = arguments[1] === undefined ? null : arguments[1];
	    var isCustom = arguments[2] === undefined ? false : arguments[2];
	    _classCallCheck(this, RowProperties);

	    this.rowMetadata = rowMetadata;
	    this.rowComponent = rowComponent;
	    this.isCustom = isCustom;
	  }

	  _prototypeProperties(RowProperties, null, {
	    getRowKey: {
	      value: function getRowKey(row) {
	        var uniqueId;

	        if (this.hasRowMetadataKey()) {
	          uniqueId = row[this.rowMetadata.key];
	        } else {
	          uniqueId = _.uniqueId("grid_row");
	        }

	        //todo: add error handling

	        return uniqueId;
	      },
	      writable: true,
	      configurable: true
	    },
	    hasRowMetadataKey: {
	      value: function hasRowMetadataKey() {
	        return this.hasRowMetadata() && this.rowMetadata.key !== null && this.rowMetadata.key !== undefined;
	      },
	      writable: true,
	      configurable: true
	    },
	    getBodyRowMetadataClass: {
	      value: function getBodyRowMetadataClass(rowData) {
	        if (this.hasRowMetadata() && this.rowMetadata.bodyCssClassName !== null && this.rowMetadata.bodyCssClassName !== undefined) {
	          if (typeof this.rowMetadata.bodyCssClassName === "function") {
	            return this.rowMetadata.bodyCssClassName(rowData);
	          } else {
	            return this.rowMetadata.bodyCssClassName;
	          }
	        }
	        return null;
	      },
	      writable: true,
	      configurable: true
	    },
	    getHeaderRowMetadataClass: {
	      value: function getHeaderRowMetadataClass() {
	        return this.hasRowMetadata() && this.rowMetadata.headerCssClassName !== null && this.rowMetadata.headerCssClassName !== undefined ? this.rowMetadata.headerCssClassName : null;
	      },
	      writable: true,
	      configurable: true
	    },
	    hasRowMetadata: {
	      value: function hasRowMetadata() {
	        return this.rowMetadata !== null;
	      },
	      writable: true,
	      configurable: true
	    }
	  });

	  return RowProperties;
	})();

	module.exports = RowProperties;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(33);

	// Credits: https://github.com/documentcloud/underscore-contrib
	// Sub module: underscore.object.selectors
	// License: MIT (https://github.com/documentcloud/underscore-contrib/blob/master/LICENSE)
	// https://github.com/documentcloud/underscore-contrib/blob/master/underscore.object.selectors.js

	// Will take a path like 'element[0][1].subElement["Hey!.What?"]["[hey]"]'
	// and return ["element", "0", "1", "subElement", "Hey!.What?", "[hey]"]
	function keysFromPath(path) {
	  // from http://codereview.stackexchange.com/a/63010/8176
	  /**
	   * Repeatedly capture either:
	   * - a bracketed expression, discarding optional matching quotes inside, or
	   * - an unbracketed expression, delimited by a dot or a bracket.
	   */
	  var re = /\[("|')(.+)\1\]|([^.\[\]]+)/g;

	  var elements = [];
	  var result;
	  while ((result = re.exec(path)) !== null) {
	    elements.push(result[2] || result[3]);
	  }
	  return elements;
	}

	// Gets the value at any depth in a nested object based on the
	// path described by the keys given. Keys may be given as an array
	// or as a dot-separated string.
	function getPath(obj, ks) {
	  ks = typeof ks == "string" ? keysFromPath(ks) : ks;

	  var i = -1,
	      length = ks.length;

	  // If the obj is null or undefined we have to break as
	  // a TypeError will result trying to access any property
	  // Otherwise keep incrementally access the next property in
	  // ks until complete
	  while (++i < length && obj != null) {
	    obj = obj[ks[i]];
	  }
	  return i === length ? obj : void 0;
	}

	// Based on the origin underscore _.pick function
	// Credit: https://github.com/jashkenas/underscore/blob/master/underscore.js
	function powerPick(object, keys) {
	  var result = {},
	      obj = object,
	      iteratee;
	  iteratee = function (key, obj) {
	    return key in obj;
	  };

	  obj = Object(obj);

	  for (var i = 0, length = keys.length; i < length; i++) {
	    var key = keys[i];
	    if (iteratee(key, obj)) result[key] = getPath(obj, key);
	  }

	  return result;
	}

	// Gets all the keys for a flattened object structure.
	// Doesn't flatten arrays.
	// Input:
	// {
	//  a: {
	//    x: 1,
	//    y: 2
	//  },
	//  b: [3, 4],
	//  c: 5
	// }
	// Output:
	// [
	//  "a.x",
	//  "a.y",
	//  "b",
	//  "c"
	// ]
	function getKeys(obj, prefix) {
	  var keys = [];

	  _.each(obj, function (value, key) {
	    var fullKey = prefix ? prefix + "." + key : key;
	    if (_.isObject(value) && !_.isArray(value) && !_.isFunction(value)) {
	      keys = keys.concat(getKeys(value, fullKey));
	    } else {
	      keys.push(fullKey);
	    }
	  });

	  return keys;
	}

	module.exports = {
	  pick: powerPick,
	  getAt: getPath,
	  keys: getKeys
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var GridFilter = React.createClass({
	    displayName: "GridFilter",

	    getDefaultProps: function getDefaultProps() {
	        return {
	            "placeholderText": ""
	        };
	    },
	    handleChange: function handleChange(event) {
	        this.props.changeFilter(event.target.value);
	    },
	    render: function render() {
	        return React.createElement("div", { className: "filter-container" }, React.createElement("input", { type: "text", name: "filter", placeholder: this.props.placeholderText, className: "form-control", onChange: this.handleChange }));
	    }
	});

	module.exports = GridFilter;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var React = __webpack_require__(2);
	var _ = __webpack_require__(33);

	//needs props maxPage, currentPage, nextFunction, prevFunction
	var GridPagination = React.createClass({
	    displayName: 'GridPagination',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            'maxPage': 0,
	            'nextText': '',
	            'previousText': '',
	            'currentPage': 0,
	            'useGriddleStyles': true,
	            'nextClassName': 'griddle-next',
	            'previousClassName': 'griddle-previous',
	            'nextIconComponent': null,
	            'previousIconComponent': null
	        };
	    },
	    pageChange: function pageChange(event) {
	        this.props.setPage(parseInt(event.target.value, 10) - 1);
	    },
	    render: function render() {
	        var previous = '';
	        var next = '';

	        if (this.props.currentPage > 0) {
	            previous = React.createElement('button', { type: 'button', onClick: this.props.previous, style: this.props.useGriddleStyles ? { 'color': '#222', border: 'none', background: 'none', margin: '0 0 0 10px' } : null }, this.props.previousIconComponent, this.props.previousText);
	        }

	        if (this.props.currentPage !== this.props.maxPage - 1) {
	            next = React.createElement('button', { type: 'button', onClick: this.props.next, style: this.props.useGriddleStyles ? { 'color': '#222', border: 'none', background: 'none', margin: '0 10px 0 0' } : null }, this.props.nextText, this.props.nextIconComponent);
	        }

	        var leftStyle = null;
	        var middleStyle = null;
	        var rightStyle = null;

	        if (this.props.useGriddleStyles === true) {
	            var baseStyle = {
	                'float': 'left',
	                minHeight: '1px',
	                marginTop: '5px'
	            };

	            rightStyle = _.extend({ textAlign: 'right', width: '34%' }, baseStyle);
	            middleStyle = _.extend({ textAlign: 'center', width: '33%' }, baseStyle);
	            leftStyle = _.extend({ width: '33%' }, baseStyle);
	        }

	        var options = [];

	        for (var i = 1; i <= this.props.maxPage; i++) {
	            options.push(React.createElement('option', { value: i, key: i }, i));
	        }

	        return React.createElement('div', { style: this.props.useGriddleStyles ? { minHeight: '35px' } : null }, React.createElement('div', { className: this.props.previousClassName, style: leftStyle }, previous), React.createElement('div', { className: 'griddle-page', style: middleStyle }, React.createElement('select', { value: this.props.currentPage + 1, onChange: this.pageChange }, options), ' / ', this.props.maxPage), React.createElement('div', { className: this.props.nextClassName, style: rightStyle }, next));
	    }
	});

	module.exports = GridPagination;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var React = __webpack_require__(2);
	var _ = __webpack_require__(33);

	var GridSettings = React.createClass({
	    displayName: 'GridSettings',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            'columns': [],
	            'columnMetadata': [],
	            'selectedColumns': [],
	            'settingsText': '',
	            'maxRowsText': '',
	            'resultsPerPage': 0,
	            'enableToggleCustom': false,
	            'useCustomComponent': false,
	            'useGriddleStyles': true,
	            'toggleCustomComponent': function toggleCustomComponent() {}
	        };
	    },
	    setPageSize: function setPageSize(event) {
	        var value = parseInt(event.target.value, 10);
	        this.props.setPageSize(value);
	    },
	    handleChange: function handleChange(event) {
	        var columnName = event.target.dataset ? event.target.dataset.name : event.target.getAttribute('data-name');
	        if (event.target.checked === true && _.contains(this.props.selectedColumns, columnName) === false) {
	            this.props.selectedColumns.push(columnName);
	            this.props.setColumns(this.props.selectedColumns);
	        } else {
	            /* redraw with the selected columns minus the one just unchecked */
	            this.props.setColumns(_.without(this.props.selectedColumns, columnName));
	        }
	    },
	    render: function render() {
	        var that = this;

	        var nodes = [];
	        //don't show column selector if we're on a custom component
	        if (that.props.useCustomComponent === false) {
	            nodes = this.props.columns.map(function (col, index) {
	                var checked = _.contains(that.props.selectedColumns, col);
	                //check column metadata -- if this one is locked make it disabled and don't put an onChange event
	                var meta = _.findWhere(that.props.columnMetadata, { columnName: col });
	                var displayName = col;

	                if (typeof meta !== 'undefined' && typeof meta.displayName !== 'undefined' && meta.displayName != null) {
	                    displayName = meta.displayName;
	                }

	                if (typeof meta !== 'undefined' && meta != null && meta.locked) {
	                    return React.createElement('div', { className: 'column checkbox' }, React.createElement('label', null, React.createElement('input', { type: 'checkbox', disabled: true, name: 'check', checked: checked, 'data-name': col }), displayName));
	                } else if (typeof meta !== 'undefined' && meta != null && typeof meta.visible !== 'undefined' && meta.visible === false) {
	                    return null;
	                }
	                return React.createElement('div', { className: 'griddle-column-selection checkbox', key: col, style: that.props.useGriddleStyles ? { 'float': 'left', width: '20%' } : null }, React.createElement('label', null, React.createElement('input', { type: 'checkbox', name: 'check', onChange: that.handleChange, checked: checked, 'data-name': col }), displayName));
	            });
	        }

	        var toggleCustom = that.props.enableToggleCustom ? React.createElement('div', { className: 'form-group' }, React.createElement('label', { htmlFor: 'maxRows' }, React.createElement('input', { type: 'checkbox', checked: this.props.useCustomComponent, onChange: this.props.toggleCustomComponent }), ' ', this.props.enableCustomFormatText)) : '';

	        var setPageSize = this.props.showSetPageSize ? React.createElement('div', null, React.createElement('label', { htmlFor: 'maxRows' }, this.props.maxRowsText, ':', React.createElement('select', { onChange: this.setPageSize, value: this.props.resultsPerPage }, React.createElement('option', { value: '5' }, '5'), React.createElement('option', { value: '10' }, '10'), React.createElement('option', { value: '25' }, '25'), React.createElement('option', { value: '50' }, '50'), React.createElement('option', { value: '100' }, '100')))) : '';

	        return React.createElement('div', { className: 'griddle-settings', style: this.props.useGriddleStyles ? { backgroundColor: '#FFF', border: '1px solid #DDD', color: '#222', padding: '10px', marginBottom: '10px' } : null }, React.createElement('h6', null, this.props.settingsText), React.createElement('div', { className: 'griddle-columns', style: this.props.useGriddleStyles ? { clear: 'both', display: 'table', width: '100%', borderBottom: '1px solid #EDEDED', marginBottom: '10px' } : null }, nodes), setPageSize, toggleCustom);
	    }
	});

	module.exports = GridSettings;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var GridNoData = React.createClass({
	    displayName: "GridNoData",

	    getDefaultProps: function getDefaultProps() {
	        return {
	            "noDataMessage": "No Data"
	        };
	    },
	    render: function render() {
	        var that = this;

	        return React.createElement("div", null, this.props.noDataMessage);
	    }
	});

	module.exports = GridNoData;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var _Object$create = __webpack_require__(17)['default'];

	var React = __webpack_require__(2);
	var _ = __webpack_require__(33);
	var ColumnProperties = __webpack_require__(4);
	var deep = __webpack_require__(37);

	var GridRow = React.createClass({
	    displayName: 'GridRow',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            'isChildRow': false,
	            'showChildren': false,
	            'data': {},
	            'columnSettings': null,
	            'rowSettings': null,
	            'hasChildren': false,
	            'useGriddleStyles': true,
	            'useGriddleIcons': true,
	            'isSubGriddle': false,
	            'paddingHeight': null,
	            'rowHeight': null,
	            'parentRowCollapsedClassName': 'parent-row',
	            'parentRowExpandedClassName': 'parent-row expanded',
	            'parentRowCollapsedComponent': '▶',
	            'parentRowExpandedComponent': '▼',
	            'onRowClick': null,
	            'multipleSelectionSettings': null
	        };
	    },
	    handleClick: function handleClick(e) {
	        if (this.props.onRowClick !== null && _.isFunction(this.props.onRowClick)) {
	            this.props.onRowClick(this, e);
	        } else if (this.props.hasChildren) {
	            this.props.toggleChildren();
	        }
	    },
	    handleSelectionChange: function handleSelectionChange(e) {
	        //hack to get around warning that's not super useful in this case
	        return;
	    },
	    handleSelectClick: function handleSelectClick(e) {
	        if (this.props.multipleSelectionSettings.isMultipleSelection) {
	            if (e.target.type === 'checkbox') {
	                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, this.refs.selected.getDOMNode().checked);
	            } else {
	                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, !this.refs.selected.getDOMNode().checked);
	            }
	        }
	    },
	    verifyProps: function verifyProps() {
	        if (this.props.columnSettings === null) {
	            console.error('gridRow: The columnSettings prop is null and it shouldn\'t be');
	        }
	    },
	    render: function render() {
	        var _this = this;

	        this.verifyProps();
	        var that = this;
	        var columnStyles = null;

	        if (this.props.useGriddleStyles) {
	            columnStyles = {
	                margin: '0',
	                padding: that.props.paddingHeight + 'px 5px ' + that.props.paddingHeight + 'px 5px',
	                height: that.props.rowHeight ? this.props.rowHeight - that.props.paddingHeight * 2 + 'px' : null,
	                backgroundColor: '#FFF',
	                borderTopColor: '#DDD',
	                color: '#222'
	            };
	        }

	        var columns = this.props.columnSettings.getColumns();

	        // make sure that all the columns we need have default empty values
	        // otherwise they will get clipped
	        var defaults = _.object(columns, []);

	        // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
	        var dataView = _Object$create(this.props.data);

	        _.defaults(dataView, defaults);

	        var data = _.pairs(deep.pick(dataView, columns));

	        var nodes = data.map(function (col, index) {
	            var returnValue = null;
	            var meta = _this.props.columnSettings.getColumnMetadataByName(col[0]);

	            //todo: Make this not as ridiculous looking
	            var firstColAppend = index === 0 && _this.props.hasChildren && _this.props.showChildren === false && _this.props.useGriddleIcons ? React.createElement('span', { style: _this.props.useGriddleStyles ? { fontSize: '10px', marginRight: '5px' } : null }, _this.props.parentRowCollapsedComponent) : index === 0 && _this.props.hasChildren && _this.props.showChildren && _this.props.useGriddleIcons ? React.createElement('span', { style: _this.props.useGriddleStyles ? { fontSize: '10px' } : null }, _this.props.parentRowExpandedComponent) : '';

	            if (index === 0 && _this.props.isChildRow && _this.props.useGriddleStyles) {
	                columnStyles = _.extend(columnStyles, { paddingLeft: 10 });
	            }

	            if (_this.props.columnSettings.hasColumnMetadata() && typeof meta !== 'undefined') {
	                var colData = typeof meta.customComponent === 'undefined' || meta.customComponent === null ? col[1] : React.createElement(meta.customComponent, { data: col[1], rowData: dataView, metadata: meta });
	                returnValue = meta == null ? returnValue : React.createElement('td', { onClick: _this.handleClick, className: meta.cssClassName, key: index, style: columnStyles }, colData);
	            }

	            return returnValue || React.createElement('td', { onClick: _this.handleClick, key: index, style: columnStyles }, firstColAppend, ' ', col[1]);
	        });

	        if (nodes && this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
	            var selectedRowIds = this.props.multipleSelectionSettings.getSelectedRowIds();

	            nodes.unshift(React.createElement('td', { key: 'selection', style: columnStyles }, React.createElement('input', {
	                type: 'checkbox',
	                checked: this.props.multipleSelectionSettings.getIsRowChecked(dataView),
	                onChange: this.handleSelectionChange,
	                ref: 'selected' })));
	        }

	        //Get the row from the row settings.
	        var className = that.props.rowSettings && that.props.rowSettings.getBodyRowMetadataClass(that.props.data) || 'standard-row';

	        if (that.props.isChildRow) {
	            className = 'child-row';
	        } else if (that.props.hasChildren) {
	            className = that.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName;
	        }
	        return React.createElement('tr', { onClick: this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection ? this.handleSelectClick : null, className: className }, nodes);
	    }
	});

	module.exports = GridRow;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   Griddle - Simple Grid Component for React
	   https://github.com/DynamicTyped/Griddle
	   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var CustomRowComponentContainer = React.createClass({
	  displayName: "CustomRowComponentContainer",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      "data": [],
	      "metadataColumns": [],
	      "className": "",
	      "customComponent": {}
	    };
	  },
	  render: function render() {
	    var that = this;

	    if (typeof that.props.customComponent !== "function") {
	      console.log("Couldn't find valid template.");
	      return React.createElement("div", { className: this.props.className });
	    }

	    var nodes = this.props.data.map(function (row, index) {
	      return React.createElement(that.props.customComponent, { data: row, metadataColumns: that.props.metadataColumns, key: index });
	    });

	    var footer = this.props.showPager && this.props.pagingContent;
	    return React.createElement("div", { className: this.props.className, style: this.props.style }, nodes);
	  }
	});

	module.exports = CustomRowComponentContainer;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   Griddle - Simple Grid Component for React
	   https://github.com/DynamicTyped/Griddle
	   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var CustomPaginationContainer = React.createClass({
	  displayName: "CustomPaginationContainer",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      "maxPage": 0,
	      "nextText": "",
	      "previousText": "",
	      "currentPage": 0,
	      "customPagerComponent": {}
	    };
	  },
	  render: function render() {
	    var that = this;

	    if (typeof that.props.customPagerComponent !== "function") {
	      console.log("Couldn't find valid template.");
	      return React.createElement("div", null);
	    }

	    return React.createElement(that.props.customPagerComponent, { maxPage: this.props.maxPage, nextText: this.props.nextText, previousText: this.props.previousText, currentPage: this.props.currentPage, setPage: this.props.setPage, previous: this.props.previous, next: this.props.next });
	  }
	});

	module.exports = CustomPaginationContainer;

/***/ }
/******/ ])
});
;
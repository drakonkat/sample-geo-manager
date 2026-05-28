import { createRequire } from "node:module";
var __defProp = Object.defineProperty;
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// node_modules/drizzle-orm/entity.cjs
var require_entity = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var entity_exports = {};
  __export2(entity_exports, {
    entityKind: () => entityKind2,
    hasOwnEntityKind: () => hasOwnEntityKind2,
    is: () => is2
  });
  module.exports = __toCommonJS(entity_exports);
  var entityKind2 = Symbol.for("drizzle:entityKind");
  var hasOwnEntityKind2 = Symbol.for("drizzle:hasOwnEntityKind");
  function is2(value, type) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (value instanceof type) {
      return true;
    }
    if (!Object.prototype.hasOwnProperty.call(type, entityKind2)) {
      throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
    }
    let cls = Object.getPrototypeOf(value).constructor;
    if (cls) {
      while (cls) {
        if (entityKind2 in cls && cls[entityKind2] === type[entityKind2]) {
          return true;
        }
        cls = Object.getPrototypeOf(cls);
      }
    }
    return false;
  }
});

// node_modules/drizzle-orm/logger.cjs
var require_logger = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var logger_exports = {};
  __export2(logger_exports, {
    ConsoleLogWriter: () => ConsoleLogWriter,
    DefaultLogger: () => DefaultLogger,
    NoopLogger: () => NoopLogger
  });
  module.exports = __toCommonJS(logger_exports);
  var import_entity18 = require_entity();

  class ConsoleLogWriter {
    static [import_entity18.entityKind] = "ConsoleLogWriter";
    write(message) {
      console.log(message);
    }
  }

  class DefaultLogger {
    static [import_entity18.entityKind] = "DefaultLogger";
    writer;
    constructor(config) {
      this.writer = config?.writer ?? new ConsoleLogWriter;
    }
    logQuery(query, params) {
      const stringifiedParams = params.map((p) => {
        try {
          return JSON.stringify(p);
        } catch {
          return String(p);
        }
      });
      const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
      this.writer.write(`Query: ${query}${paramsStr}`);
    }
  }

  class NoopLogger {
    static [import_entity18.entityKind] = "NoopLogger";
    logQuery() {}
  }
});

// node_modules/drizzle-orm/table.utils.cjs
var require_table_utils = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var table_utils_exports = {};
  __export2(table_utils_exports, {
    TableName: () => TableName2
  });
  module.exports = __toCommonJS(table_utils_exports);
  var TableName2 = Symbol.for("drizzle:Name");
});

// node_modules/drizzle-orm/table.cjs
var require_table = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var table_exports = {};
  __export2(table_exports, {
    BaseName: () => BaseName2,
    Columns: () => Columns2,
    ExtraConfigBuilder: () => ExtraConfigBuilder2,
    ExtraConfigColumns: () => ExtraConfigColumns2,
    IsAlias: () => IsAlias2,
    OriginalName: () => OriginalName2,
    Schema: () => Schema2,
    Table: () => Table2,
    getTableName: () => getTableName,
    getTableUniqueName: () => getTableUniqueName,
    isTable: () => isTable
  });
  module.exports = __toCommonJS(table_exports);
  var import_entity18 = require_entity();
  var import_table_utils5 = require_table_utils();
  var Schema2 = Symbol.for("drizzle:Schema");
  var Columns2 = Symbol.for("drizzle:Columns");
  var ExtraConfigColumns2 = Symbol.for("drizzle:ExtraConfigColumns");
  var OriginalName2 = Symbol.for("drizzle:OriginalName");
  var BaseName2 = Symbol.for("drizzle:BaseName");
  var IsAlias2 = Symbol.for("drizzle:IsAlias");
  var ExtraConfigBuilder2 = Symbol.for("drizzle:ExtraConfigBuilder");
  var IsDrizzleTable2 = Symbol.for("drizzle:IsDrizzleTable");

  class Table2 {
    static [import_entity18.entityKind] = "Table";
    static Symbol = {
      Name: import_table_utils5.TableName,
      Schema: Schema2,
      OriginalName: OriginalName2,
      Columns: Columns2,
      ExtraConfigColumns: ExtraConfigColumns2,
      BaseName: BaseName2,
      IsAlias: IsAlias2,
      ExtraConfigBuilder: ExtraConfigBuilder2
    };
    [import_table_utils5.TableName];
    [OriginalName2];
    [Schema2];
    [Columns2];
    [ExtraConfigColumns2];
    [BaseName2];
    [IsAlias2] = false;
    [IsDrizzleTable2] = true;
    [ExtraConfigBuilder2] = undefined;
    constructor(name, schema, baseName) {
      this[import_table_utils5.TableName] = this[OriginalName2] = name;
      this[Schema2] = schema;
      this[BaseName2] = baseName;
    }
  }
  function isTable(table) {
    return typeof table === "object" && table !== null && IsDrizzleTable2 in table;
  }
  function getTableName(table) {
    return table[import_table_utils5.TableName];
  }
  function getTableUniqueName(table) {
    return `${table[Schema2] ?? "public"}.${table[import_table_utils5.TableName]}`;
  }
});

// node_modules/drizzle-orm/column.cjs
var require_column = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var column_exports = {};
  __export2(column_exports, {
    Column: () => Column2
  });
  module.exports = __toCommonJS(column_exports);
  var import_entity18 = require_entity();

  class Column2 {
    constructor(table, config) {
      this.table = table;
      this.config = config;
      this.name = config.name;
      this.keyAsName = config.keyAsName;
      this.notNull = config.notNull;
      this.default = config.default;
      this.defaultFn = config.defaultFn;
      this.onUpdateFn = config.onUpdateFn;
      this.hasDefault = config.hasDefault;
      this.primary = config.primaryKey;
      this.isUnique = config.isUnique;
      this.uniqueName = config.uniqueName;
      this.uniqueType = config.uniqueType;
      this.dataType = config.dataType;
      this.columnType = config.columnType;
      this.generated = config.generated;
      this.generatedIdentity = config.generatedIdentity;
    }
    static [import_entity18.entityKind] = "Column";
    name;
    keyAsName;
    primary;
    notNull;
    default;
    defaultFn;
    onUpdateFn;
    hasDefault;
    isUnique;
    uniqueName;
    uniqueType;
    dataType;
    columnType;
    enumValues = undefined;
    generated = undefined;
    generatedIdentity = undefined;
    config;
    mapFromDriverValue(value) {
      return value;
    }
    mapToDriverValue(value) {
      return value;
    }
    shouldDisableInsert() {
      return this.config.generated !== undefined && this.config.generated.type !== "byDefault";
    }
  }
});

// node_modules/drizzle-orm/column-builder.cjs
var require_column_builder = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var column_builder_exports = {};
  __export2(column_builder_exports, {
    ColumnBuilder: () => ColumnBuilder2
  });
  module.exports = __toCommonJS(column_builder_exports);
  var import_entity18 = require_entity();

  class ColumnBuilder2 {
    static [import_entity18.entityKind] = "ColumnBuilder";
    config;
    constructor(name, dataType, columnType) {
      this.config = {
        name,
        keyAsName: name === "",
        notNull: false,
        default: undefined,
        hasDefault: false,
        primaryKey: false,
        isUnique: false,
        uniqueName: undefined,
        uniqueType: undefined,
        dataType,
        columnType,
        generated: undefined
      };
    }
    $type() {
      return this;
    }
    notNull() {
      this.config.notNull = true;
      return this;
    }
    default(value) {
      this.config.default = value;
      this.config.hasDefault = true;
      return this;
    }
    $defaultFn(fn) {
      this.config.defaultFn = fn;
      this.config.hasDefault = true;
      return this;
    }
    $default = this.$defaultFn;
    $onUpdateFn(fn) {
      this.config.onUpdateFn = fn;
      this.config.hasDefault = true;
      return this;
    }
    $onUpdate = this.$onUpdateFn;
    primaryKey() {
      this.config.primaryKey = true;
      this.config.notNull = true;
      return this;
    }
    setName(name) {
      if (this.config.name !== "")
        return;
      this.config.name = name;
    }
  }
});

// node_modules/drizzle-orm/pg-core/foreign-keys.cjs
var require_foreign_keys = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var foreign_keys_exports = {};
  __export2(foreign_keys_exports, {
    ForeignKey: () => ForeignKey2,
    ForeignKeyBuilder: () => ForeignKeyBuilder2,
    foreignKey: () => foreignKey
  });
  module.exports = __toCommonJS(foreign_keys_exports);
  var import_entity18 = require_entity();
  var import_table_utils5 = require_table_utils();

  class ForeignKeyBuilder2 {
    static [import_entity18.entityKind] = "PgForeignKeyBuilder";
    reference;
    _onUpdate = "no action";
    _onDelete = "no action";
    constructor(config, actions) {
      this.reference = () => {
        const { name, columns, foreignColumns } = config();
        return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
      };
      if (actions) {
        this._onUpdate = actions.onUpdate;
        this._onDelete = actions.onDelete;
      }
    }
    onUpdate(action) {
      this._onUpdate = action === undefined ? "no action" : action;
      return this;
    }
    onDelete(action) {
      this._onDelete = action === undefined ? "no action" : action;
      return this;
    }
    build(table) {
      return new ForeignKey2(table, this);
    }
  }

  class ForeignKey2 {
    constructor(table, builder) {
      this.table = table;
      this.reference = builder.reference;
      this.onUpdate = builder._onUpdate;
      this.onDelete = builder._onDelete;
    }
    static [import_entity18.entityKind] = "PgForeignKey";
    reference;
    onUpdate;
    onDelete;
    getName() {
      const { name, columns, foreignColumns } = this.reference();
      const columnNames = columns.map((column) => column.name);
      const foreignColumnNames = foreignColumns.map((column) => column.name);
      const chunks = [
        this.table[import_table_utils5.TableName],
        ...columnNames,
        foreignColumns[0].table[import_table_utils5.TableName],
        ...foreignColumnNames
      ];
      return name ?? `${chunks.join("_")}_fk`;
    }
  }
  function foreignKey(config) {
    function mappedConfig() {
      const { name, columns, foreignColumns } = config;
      return {
        name,
        columns,
        foreignColumns
      };
    }
    return new ForeignKeyBuilder2(mappedConfig);
  }
});

// node_modules/drizzle-orm/tracing-utils.cjs
var require_tracing_utils = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var tracing_utils_exports = {};
  __export2(tracing_utils_exports, {
    iife: () => iife2
  });
  module.exports = __toCommonJS(tracing_utils_exports);
  function iife2(fn, ...args) {
    return fn(...args);
  }
});

// node_modules/drizzle-orm/pg-core/unique-constraint.cjs
var require_unique_constraint = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var unique_constraint_exports = {};
  __export2(unique_constraint_exports, {
    UniqueConstraint: () => UniqueConstraint2,
    UniqueConstraintBuilder: () => UniqueConstraintBuilder2,
    UniqueOnConstraintBuilder: () => UniqueOnConstraintBuilder2,
    unique: () => unique2,
    uniqueKeyName: () => uniqueKeyName3
  });
  module.exports = __toCommonJS(unique_constraint_exports);
  var import_entity18 = require_entity();
  var import_table_utils5 = require_table_utils();
  function unique2(name) {
    return new UniqueOnConstraintBuilder2(name);
  }
  function uniqueKeyName3(table, columns) {
    return `${table[import_table_utils5.TableName]}_${columns.join("_")}_unique`;
  }

  class UniqueConstraintBuilder2 {
    constructor(columns, name) {
      this.name = name;
      this.columns = columns;
    }
    static [import_entity18.entityKind] = "PgUniqueConstraintBuilder";
    columns;
    nullsNotDistinctConfig = false;
    nullsNotDistinct() {
      this.nullsNotDistinctConfig = true;
      return this;
    }
    build(table) {
      return new UniqueConstraint2(table, this.columns, this.nullsNotDistinctConfig, this.name);
    }
  }

  class UniqueOnConstraintBuilder2 {
    static [import_entity18.entityKind] = "PgUniqueOnConstraintBuilder";
    name;
    constructor(name) {
      this.name = name;
    }
    on(...columns) {
      return new UniqueConstraintBuilder2(columns, this.name);
    }
  }

  class UniqueConstraint2 {
    constructor(table, columns, nullsNotDistinct, name) {
      this.table = table;
      this.columns = columns;
      this.name = name ?? uniqueKeyName3(this.table, this.columns.map((column) => column.name));
      this.nullsNotDistinct = nullsNotDistinct;
    }
    static [import_entity18.entityKind] = "PgUniqueConstraint";
    columns;
    name;
    nullsNotDistinct = false;
    getName() {
      return this.name;
    }
  }
});

// node_modules/drizzle-orm/pg-core/utils/array.cjs
var require_array = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var array_exports = {};
  __export2(array_exports, {
    makePgArray: () => makePgArray,
    parsePgArray: () => parsePgArray,
    parsePgNestedArray: () => parsePgNestedArray
  });
  module.exports = __toCommonJS(array_exports);
  function parsePgArrayValue(arrayString, startFrom, inQuotes) {
    for (let i = startFrom;i < arrayString.length; i++) {
      const char = arrayString[i];
      if (char === "\\") {
        i++;
        continue;
      }
      if (char === '"') {
        return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
      }
      if (inQuotes) {
        continue;
      }
      if (char === "," || char === "}") {
        return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
      }
    }
    return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
  }
  function parsePgNestedArray(arrayString, startFrom = 0) {
    const result = [];
    let i = startFrom;
    let lastCharIsComma = false;
    while (i < arrayString.length) {
      const char = arrayString[i];
      if (char === ",") {
        if (lastCharIsComma || i === startFrom) {
          result.push("");
        }
        lastCharIsComma = true;
        i++;
        continue;
      }
      lastCharIsComma = false;
      if (char === "\\") {
        i += 2;
        continue;
      }
      if (char === '"') {
        const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
        result.push(value2);
        i = startFrom2;
        continue;
      }
      if (char === "}") {
        return [result, i + 1];
      }
      if (char === "{") {
        const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
        result.push(value2);
        i = startFrom2;
        continue;
      }
      const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
      result.push(value);
      i = newStartFrom;
    }
    return [result, i];
  }
  function parsePgArray(arrayString) {
    const [result] = parsePgNestedArray(arrayString, 1);
    return result;
  }
  function makePgArray(array) {
    return `{${array.map((item) => {
      if (Array.isArray(item)) {
        return makePgArray(item);
      }
      if (typeof item === "string") {
        return `"${item.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
      }
      return `${item}`;
    }).join(",")}}`;
  }
});

// node_modules/drizzle-orm/pg-core/columns/common.cjs
var require_common = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var common_exports = {};
  __export2(common_exports, {
    ExtraConfigColumn: () => ExtraConfigColumn2,
    IndexedColumn: () => IndexedColumn,
    PgArray: () => PgArray,
    PgArrayBuilder: () => PgArrayBuilder,
    PgColumn: () => PgColumn2,
    PgColumnBuilder: () => PgColumnBuilder2
  });
  module.exports = __toCommonJS(common_exports);
  var import_column_builder2 = require_column_builder();
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_foreign_keys2 = require_foreign_keys();
  var import_tracing_utils2 = require_tracing_utils();
  var import_unique_constraint3 = require_unique_constraint();
  var import_array = require_array();

  class PgColumnBuilder2 extends import_column_builder2.ColumnBuilder {
    foreignKeyConfigs = [];
    static [import_entity18.entityKind] = "PgColumnBuilder";
    array(size) {
      return new PgArrayBuilder(this.config.name, this, size);
    }
    references(ref, actions = {}) {
      this.foreignKeyConfigs.push({ ref, actions });
      return this;
    }
    unique(name, config) {
      this.config.isUnique = true;
      this.config.uniqueName = name;
      this.config.uniqueType = config?.nulls;
      return this;
    }
    generatedAlwaysAs(as) {
      this.config.generated = {
        as,
        type: "always",
        mode: "stored"
      };
      return this;
    }
    buildForeignKeys(column, table) {
      return this.foreignKeyConfigs.map(({ ref, actions }) => {
        return (0, import_tracing_utils2.iife)((ref2, actions2) => {
          const builder = new import_foreign_keys2.ForeignKeyBuilder(() => {
            const foreignColumn = ref2();
            return { columns: [column], foreignColumns: [foreignColumn] };
          });
          if (actions2.onUpdate) {
            builder.onUpdate(actions2.onUpdate);
          }
          if (actions2.onDelete) {
            builder.onDelete(actions2.onDelete);
          }
          return builder.build(table);
        }, ref, actions);
      });
    }
    buildExtraConfigColumn(table) {
      return new ExtraConfigColumn2(table, this.config);
    }
  }

  class PgColumn2 extends import_column4.Column {
    constructor(table, config) {
      if (!config.uniqueName) {
        config.uniqueName = (0, import_unique_constraint3.uniqueKeyName)(table, [config.name]);
      }
      super(table, config);
      this.table = table;
    }
    static [import_entity18.entityKind] = "PgColumn";
  }

  class ExtraConfigColumn2 extends PgColumn2 {
    static [import_entity18.entityKind] = "ExtraConfigColumn";
    getSQLType() {
      return this.getSQLType();
    }
    indexConfig = {
      order: this.config.order ?? "asc",
      nulls: this.config.nulls ?? "last",
      opClass: this.config.opClass
    };
    defaultConfig = {
      order: "asc",
      nulls: "last",
      opClass: undefined
    };
    asc() {
      this.indexConfig.order = "asc";
      return this;
    }
    desc() {
      this.indexConfig.order = "desc";
      return this;
    }
    nullsFirst() {
      this.indexConfig.nulls = "first";
      return this;
    }
    nullsLast() {
      this.indexConfig.nulls = "last";
      return this;
    }
    op(opClass) {
      this.indexConfig.opClass = opClass;
      return this;
    }
  }

  class IndexedColumn {
    static [import_entity18.entityKind] = "IndexedColumn";
    constructor(name, keyAsName, type, indexConfig) {
      this.name = name;
      this.keyAsName = keyAsName;
      this.type = type;
      this.indexConfig = indexConfig;
    }
    name;
    keyAsName;
    type;
    indexConfig;
  }

  class PgArrayBuilder extends PgColumnBuilder2 {
    static [import_entity18.entityKind] = "PgArrayBuilder";
    constructor(name, baseBuilder, size) {
      super(name, "array", "PgArray");
      this.config.baseBuilder = baseBuilder;
      this.config.size = size;
    }
    build(table) {
      const baseColumn = this.config.baseBuilder.build(table);
      return new PgArray(table, this.config, baseColumn);
    }
  }

  class PgArray extends PgColumn2 {
    constructor(table, config, baseColumn, range) {
      super(table, config);
      this.baseColumn = baseColumn;
      this.range = range;
      this.size = config.size;
    }
    size;
    static [import_entity18.entityKind] = "PgArray";
    getSQLType() {
      return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
    }
    mapFromDriverValue(value) {
      if (typeof value === "string") {
        value = (0, import_array.parsePgArray)(value);
      }
      return value.map((v) => this.baseColumn.mapFromDriverValue(v));
    }
    mapToDriverValue(value, isNestedArray = false) {
      const a = value.map((v) => v === null ? null : (0, import_entity18.is)(this.baseColumn, PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v));
      if (isNestedArray)
        return a;
      return (0, import_array.makePgArray)(a);
    }
  }
});

// node_modules/drizzle-orm/pg-core/columns/enum.cjs
var require_enum = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var enum_exports = {};
  __export2(enum_exports, {
    PgEnumColumn: () => PgEnumColumn2,
    PgEnumColumnBuilder: () => PgEnumColumnBuilder,
    PgEnumObjectColumn: () => PgEnumObjectColumn2,
    PgEnumObjectColumnBuilder: () => PgEnumObjectColumnBuilder,
    isPgEnum: () => isPgEnum2,
    pgEnum: () => pgEnum,
    pgEnumObjectWithSchema: () => pgEnumObjectWithSchema,
    pgEnumWithSchema: () => pgEnumWithSchema
  });
  module.exports = __toCommonJS(enum_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgEnumObjectColumnBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgEnumObjectColumnBuilder";
    constructor(name, enumInstance) {
      super(name, "string", "PgEnumObjectColumn");
      this.config.enum = enumInstance;
    }
    build(table) {
      return new PgEnumObjectColumn2(table, this.config);
    }
  }

  class PgEnumObjectColumn2 extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgEnumObjectColumn";
    enum;
    enumValues = this.config.enum.enumValues;
    constructor(table, config) {
      super(table, config);
      this.enum = config.enum;
    }
    getSQLType() {
      return this.enum.enumName;
    }
  }
  var isPgEnumSym2 = Symbol.for("drizzle:isPgEnum");
  function isPgEnum2(obj) {
    return !!obj && typeof obj === "function" && isPgEnumSym2 in obj && obj[isPgEnumSym2] === true;
  }

  class PgEnumColumnBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgEnumColumnBuilder";
    constructor(name, enumInstance) {
      super(name, "string", "PgEnumColumn");
      this.config.enum = enumInstance;
    }
    build(table) {
      return new PgEnumColumn2(table, this.config);
    }
  }

  class PgEnumColumn2 extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgEnumColumn";
    enum = this.config.enum;
    enumValues = this.config.enum.enumValues;
    constructor(table, config) {
      super(table, config);
      this.enum = config.enum;
    }
    getSQLType() {
      return this.enum.enumName;
    }
  }
  function pgEnum(enumName, input) {
    return Array.isArray(input) ? pgEnumWithSchema(enumName, [...input], undefined) : pgEnumObjectWithSchema(enumName, input, undefined);
  }
  function pgEnumWithSchema(enumName, values, schema) {
    const enumInstance = Object.assign((name) => new PgEnumColumnBuilder(name ?? "", enumInstance), {
      enumName,
      enumValues: values,
      schema,
      [isPgEnumSym2]: true
    });
    return enumInstance;
  }
  function pgEnumObjectWithSchema(enumName, values, schema) {
    const enumInstance = Object.assign((name) => new PgEnumObjectColumnBuilder(name ?? "", enumInstance), {
      enumName,
      enumValues: Object.values(values),
      schema,
      [isPgEnumSym2]: true
    });
    return enumInstance;
  }
});

// node_modules/drizzle-orm/subquery.cjs
var require_subquery = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var subquery_exports = {};
  __export2(subquery_exports, {
    Subquery: () => Subquery2,
    WithSubquery: () => WithSubquery
  });
  module.exports = __toCommonJS(subquery_exports);
  var import_entity18 = require_entity();

  class Subquery2 {
    static [import_entity18.entityKind] = "Subquery";
    constructor(sql2, fields, alias, isWith = false, usedTables = []) {
      this._ = {
        brand: "Subquery",
        sql: sql2,
        selectedFields: fields,
        alias,
        isWith,
        usedTables
      };
    }
  }

  class WithSubquery extends Subquery2 {
    static [import_entity18.entityKind] = "WithSubquery";
  }
});

// node_modules/drizzle-orm/version.cjs
var require_version = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var version_exports = {};
  __export2(version_exports, {
    compatibilityVersion: () => compatibilityVersion,
    npmVersion: () => version2
  });
  module.exports = __toCommonJS(version_exports);
  var version2 = "0.45.2";
  var compatibilityVersion = 10;
});

// node_modules/drizzle-orm/tracing.cjs
var require_tracing = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var tracing_exports = {};
  __export2(tracing_exports, {
    tracer: () => tracer2
  });
  module.exports = __toCommonJS(tracing_exports);
  var import_tracing_utils2 = require_tracing_utils();
  var import_version2 = require_version();
  var otel2;
  var rawTracer2;
  var tracer2 = {
    startActiveSpan(name, fn) {
      if (!otel2) {
        return fn();
      }
      if (!rawTracer2) {
        rawTracer2 = otel2.trace.getTracer("drizzle-orm", import_version2.npmVersion);
      }
      return (0, import_tracing_utils2.iife)((otel22, rawTracer22) => rawTracer22.startActiveSpan(name, (span) => {
        try {
          return fn(span);
        } catch (e) {
          span.setStatus({
            code: otel22.SpanStatusCode.ERROR,
            message: e instanceof Error ? e.message : "Unknown error"
          });
          throw e;
        } finally {
          span.end();
        }
      }), otel2, rawTracer2);
    }
  };
});

// node_modules/drizzle-orm/view-common.cjs
var require_view_common = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var view_common_exports = {};
  __export2(view_common_exports, {
    ViewBaseConfig: () => ViewBaseConfig2
  });
  module.exports = __toCommonJS(view_common_exports);
  var ViewBaseConfig2 = Symbol.for("drizzle:ViewBaseConfig");
});

// node_modules/drizzle-orm/sql/sql.cjs
var require_sql = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name2 in all)
      __defProp2(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var sql_exports = {};
  __export2(sql_exports, {
    FakePrimitiveParam: () => FakePrimitiveParam,
    Name: () => Name2,
    Param: () => Param2,
    Placeholder: () => Placeholder2,
    SQL: () => SQL2,
    StringChunk: () => StringChunk2,
    View: () => View2,
    fillPlaceholders: () => fillPlaceholders,
    getViewName: () => getViewName,
    isDriverValueEncoder: () => isDriverValueEncoder,
    isSQLWrapper: () => isSQLWrapper2,
    isView: () => isView,
    name: () => name,
    noopDecoder: () => noopDecoder2,
    noopEncoder: () => noopEncoder2,
    noopMapper: () => noopMapper2,
    param: () => param,
    placeholder: () => placeholder,
    sql: () => sql2
  });
  module.exports = __toCommonJS(sql_exports);
  var import_entity18 = require_entity();
  var import_enum2 = require_enum();
  var import_subquery2 = require_subquery();
  var import_tracing2 = require_tracing();
  var import_view_common2 = require_view_common();
  var import_column4 = require_column();
  var import_table3 = require_table();

  class FakePrimitiveParam {
    static [import_entity18.entityKind] = "FakePrimitiveParam";
  }
  function isSQLWrapper2(value) {
    return value !== null && value !== undefined && typeof value.getSQL === "function";
  }
  function mergeQueries2(queries) {
    const result = { sql: "", params: [] };
    for (const query of queries) {
      result.sql += query.sql;
      result.params.push(...query.params);
      if (query.typings?.length) {
        if (!result.typings) {
          result.typings = [];
        }
        result.typings.push(...query.typings);
      }
    }
    return result;
  }

  class StringChunk2 {
    static [import_entity18.entityKind] = "StringChunk";
    value;
    constructor(value) {
      this.value = Array.isArray(value) ? value : [value];
    }
    getSQL() {
      return new SQL2([this]);
    }
  }

  class SQL2 {
    constructor(queryChunks) {
      this.queryChunks = queryChunks;
      for (const chunk of queryChunks) {
        if ((0, import_entity18.is)(chunk, import_table3.Table)) {
          const schemaName = chunk[import_table3.Table.Symbol.Schema];
          this.usedTables.push(schemaName === undefined ? chunk[import_table3.Table.Symbol.Name] : schemaName + "." + chunk[import_table3.Table.Symbol.Name]);
        }
      }
    }
    static [import_entity18.entityKind] = "SQL";
    decoder = noopDecoder2;
    shouldInlineParams = false;
    usedTables = [];
    append(query) {
      this.queryChunks.push(...query.queryChunks);
      return this;
    }
    toQuery(config) {
      return import_tracing2.tracer.startActiveSpan("drizzle.buildSQL", (span) => {
        const query = this.buildQueryFromSourceParams(this.queryChunks, config);
        span?.setAttributes({
          "drizzle.query.text": query.sql,
          "drizzle.query.params": JSON.stringify(query.params)
        });
        return query;
      });
    }
    buildQueryFromSourceParams(chunks, _config) {
      const config = Object.assign({}, _config, {
        inlineParams: _config.inlineParams || this.shouldInlineParams,
        paramStartIndex: _config.paramStartIndex || { value: 0 }
      });
      const {
        casing,
        escapeName,
        escapeParam,
        prepareTyping,
        inlineParams,
        paramStartIndex
      } = config;
      return mergeQueries2(chunks.map((chunk) => {
        if ((0, import_entity18.is)(chunk, StringChunk2)) {
          return { sql: chunk.value.join(""), params: [] };
        }
        if ((0, import_entity18.is)(chunk, Name2)) {
          return { sql: escapeName(chunk.value), params: [] };
        }
        if (chunk === undefined) {
          return { sql: "", params: [] };
        }
        if (Array.isArray(chunk)) {
          const result = [new StringChunk2("(")];
          for (const [i, p] of chunk.entries()) {
            result.push(p);
            if (i < chunk.length - 1) {
              result.push(new StringChunk2(", "));
            }
          }
          result.push(new StringChunk2(")"));
          return this.buildQueryFromSourceParams(result, config);
        }
        if ((0, import_entity18.is)(chunk, SQL2)) {
          return this.buildQueryFromSourceParams(chunk.queryChunks, {
            ...config,
            inlineParams: inlineParams || chunk.shouldInlineParams
          });
        }
        if ((0, import_entity18.is)(chunk, import_table3.Table)) {
          const schemaName = chunk[import_table3.Table.Symbol.Schema];
          const tableName = chunk[import_table3.Table.Symbol.Name];
          return {
            sql: schemaName === undefined || chunk[import_table3.IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
            params: []
          };
        }
        if ((0, import_entity18.is)(chunk, import_column4.Column)) {
          const columnName = casing.getColumnCasing(chunk);
          if (_config.invokeSource === "indexes") {
            return { sql: escapeName(columnName), params: [] };
          }
          const schemaName = chunk.table[import_table3.Table.Symbol.Schema];
          return {
            sql: chunk.table[import_table3.IsAlias] || schemaName === undefined ? escapeName(chunk.table[import_table3.Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[import_table3.Table.Symbol.Name]) + "." + escapeName(columnName),
            params: []
          };
        }
        if ((0, import_entity18.is)(chunk, View2)) {
          const schemaName = chunk[import_view_common2.ViewBaseConfig].schema;
          const viewName = chunk[import_view_common2.ViewBaseConfig].name;
          return {
            sql: schemaName === undefined || chunk[import_view_common2.ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
            params: []
          };
        }
        if ((0, import_entity18.is)(chunk, Param2)) {
          if ((0, import_entity18.is)(chunk.value, Placeholder2)) {
            return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
          }
          const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
          if ((0, import_entity18.is)(mappedValue, SQL2)) {
            return this.buildQueryFromSourceParams([mappedValue], config);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(mappedValue, config), params: [] };
          }
          let typings = ["none"];
          if (prepareTyping) {
            typings = [prepareTyping(chunk.encoder)];
          }
          return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
        }
        if ((0, import_entity18.is)(chunk, Placeholder2)) {
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }
        if ((0, import_entity18.is)(chunk, SQL2.Aliased) && chunk.fieldAlias !== undefined) {
          return { sql: escapeName(chunk.fieldAlias), params: [] };
        }
        if ((0, import_entity18.is)(chunk, import_subquery2.Subquery)) {
          if (chunk._.isWith) {
            return { sql: escapeName(chunk._.alias), params: [] };
          }
          return this.buildQueryFromSourceParams([
            new StringChunk2("("),
            chunk._.sql,
            new StringChunk2(") "),
            new Name2(chunk._.alias)
          ], config);
        }
        if ((0, import_enum2.isPgEnum)(chunk)) {
          if (chunk.schema) {
            return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
          }
          return { sql: escapeName(chunk.enumName), params: [] };
        }
        if (isSQLWrapper2(chunk)) {
          if (chunk.shouldOmitSQLParens?.()) {
            return this.buildQueryFromSourceParams([chunk.getSQL()], config);
          }
          return this.buildQueryFromSourceParams([
            new StringChunk2("("),
            chunk.getSQL(),
            new StringChunk2(")")
          ], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(chunk, config), params: [] };
        }
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
      }));
    }
    mapInlineParam(chunk, { escapeString }) {
      if (chunk === null) {
        return "null";
      }
      if (typeof chunk === "number" || typeof chunk === "boolean") {
        return chunk.toString();
      }
      if (typeof chunk === "string") {
        return escapeString(chunk);
      }
      if (typeof chunk === "object") {
        const mappedValueAsString = chunk.toString();
        if (mappedValueAsString === "[object Object]") {
          return escapeString(JSON.stringify(chunk));
        }
        return escapeString(mappedValueAsString);
      }
      throw new Error("Unexpected param value: " + chunk);
    }
    getSQL() {
      return this;
    }
    as(alias) {
      if (alias === undefined) {
        return this;
      }
      return new SQL2.Aliased(this, alias);
    }
    mapWith(decoder) {
      this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
      return this;
    }
    inlineParams() {
      this.shouldInlineParams = true;
      return this;
    }
    if(condition) {
      return condition ? this : undefined;
    }
  }

  class Name2 {
    constructor(value) {
      this.value = value;
    }
    static [import_entity18.entityKind] = "Name";
    brand;
    getSQL() {
      return new SQL2([this]);
    }
  }
  function name(value) {
    return new Name2(value);
  }
  function isDriverValueEncoder(value) {
    return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
  }
  var noopDecoder2 = {
    mapFromDriverValue: (value) => value
  };
  var noopEncoder2 = {
    mapToDriverValue: (value) => value
  };
  var noopMapper2 = {
    ...noopDecoder2,
    ...noopEncoder2
  };

  class Param2 {
    constructor(value, encoder = noopEncoder2) {
      this.value = value;
      this.encoder = encoder;
    }
    static [import_entity18.entityKind] = "Param";
    brand;
    getSQL() {
      return new SQL2([this]);
    }
  }
  function param(value, encoder) {
    return new Param2(value, encoder);
  }
  function sql2(strings, ...params) {
    const queryChunks = [];
    if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
      queryChunks.push(new StringChunk2(strings[0]));
    }
    for (const [paramIndex, param2] of params.entries()) {
      queryChunks.push(param2, new StringChunk2(strings[paramIndex + 1]));
    }
    return new SQL2(queryChunks);
  }
  ((sql22) => {
    function empty() {
      return new SQL2([]);
    }
    sql22.empty = empty;
    function fromList(list) {
      return new SQL2(list);
    }
    sql22.fromList = fromList;
    function raw(str) {
      return new SQL2([new StringChunk2(str)]);
    }
    sql22.raw = raw;
    function join(chunks, separator) {
      const result = [];
      for (const [i, chunk] of chunks.entries()) {
        if (i > 0 && separator !== undefined) {
          result.push(separator);
        }
        result.push(chunk);
      }
      return new SQL2(result);
    }
    sql22.join = join;
    function identifier(value) {
      return new Name2(value);
    }
    sql22.identifier = identifier;
    function placeholder2(name2) {
      return new Placeholder2(name2);
    }
    sql22.placeholder = placeholder2;
    function param2(value, encoder) {
      return new Param2(value, encoder);
    }
    sql22.param = param2;
  })(sql2 || (sql2 = {}));
  ((SQL22) => {

    class Aliased {
      constructor(sql22, fieldAlias) {
        this.sql = sql22;
        this.fieldAlias = fieldAlias;
      }
      static [import_entity18.entityKind] = "SQL.Aliased";
      isSelectionField = false;
      getSQL() {
        return this.sql;
      }
      clone() {
        return new Aliased(this.sql, this.fieldAlias);
      }
    }
    SQL22.Aliased = Aliased;
  })(SQL2 || (SQL2 = {}));

  class Placeholder2 {
    constructor(name2) {
      this.name = name2;
    }
    static [import_entity18.entityKind] = "Placeholder";
    getSQL() {
      return new SQL2([this]);
    }
  }
  function placeholder(name2) {
    return new Placeholder2(name2);
  }
  function fillPlaceholders(params, values) {
    return params.map((p) => {
      if ((0, import_entity18.is)(p, Placeholder2)) {
        if (!(p.name in values)) {
          throw new Error(`No value for placeholder "${p.name}" was provided`);
        }
        return values[p.name];
      }
      if ((0, import_entity18.is)(p, Param2) && (0, import_entity18.is)(p.value, Placeholder2)) {
        if (!(p.value.name in values)) {
          throw new Error(`No value for placeholder "${p.value.name}" was provided`);
        }
        return p.encoder.mapToDriverValue(values[p.value.name]);
      }
      return p;
    });
  }
  var IsDrizzleView2 = Symbol.for("drizzle:IsDrizzleView");

  class View2 {
    static [import_entity18.entityKind] = "View";
    [import_view_common2.ViewBaseConfig];
    [IsDrizzleView2] = true;
    constructor({ name: name2, schema, selectedFields, query }) {
      this[import_view_common2.ViewBaseConfig] = {
        name: name2,
        originalName: name2,
        schema,
        selectedFields,
        query,
        isExisting: !query,
        isAlias: false
      };
    }
    getSQL() {
      return new SQL2([this]);
    }
  }
  function isView(view) {
    return typeof view === "object" && view !== null && IsDrizzleView2 in view;
  }
  function getViewName(view) {
    return view[import_view_common2.ViewBaseConfig].name;
  }
  import_column4.Column.prototype.getSQL = function() {
    return new SQL2([this]);
  };
  import_table3.Table.prototype.getSQL = function() {
    return new SQL2([this]);
  };
  import_subquery2.Subquery.prototype.getSQL = function() {
    return new SQL2([this]);
  };
});

// node_modules/drizzle-orm/utils.cjs
var require_utils = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var utils_exports = {};
  __export2(utils_exports, {
    applyMixins: () => applyMixins,
    getColumnNameAndConfig: () => getColumnNameAndConfig2,
    getTableColumns: () => getTableColumns,
    getTableLikeName: () => getTableLikeName,
    getViewSelectedFields: () => getViewSelectedFields,
    haveSameKeys: () => haveSameKeys,
    isConfig: () => isConfig,
    mapResultRow: () => mapResultRow,
    mapUpdateSet: () => mapUpdateSet,
    orderSelectedFields: () => orderSelectedFields,
    textDecoder: () => textDecoder2
  });
  module.exports = __toCommonJS(utils_exports);
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  var import_subquery2 = require_subquery();
  var import_table3 = require_table();
  var import_view_common2 = require_view_common();
  function mapResultRow(columns, row, joinsNotNullableMap) {
    const nullifyMap = {};
    const result = columns.reduce((result2, { path, field }, columnIndex) => {
      let decoder;
      if ((0, import_entity18.is)(field, import_column4.Column)) {
        decoder = field;
      } else if ((0, import_entity18.is)(field, import_sql2.SQL)) {
        decoder = field.decoder;
      } else if ((0, import_entity18.is)(field, import_subquery2.Subquery)) {
        decoder = field._.sql.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      let node = result2;
      for (const [pathChunkIndex, pathChunk] of path.entries()) {
        if (pathChunkIndex < path.length - 1) {
          if (!(pathChunk in node)) {
            node[pathChunk] = {};
          }
          node = node[pathChunk];
        } else {
          const rawValue = row[columnIndex];
          const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
          if (joinsNotNullableMap && (0, import_entity18.is)(field, import_column4.Column) && path.length === 2) {
            const objectName = path[0];
            if (!(objectName in nullifyMap)) {
              nullifyMap[objectName] = value === null ? (0, import_table3.getTableName)(field.table) : false;
            } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== (0, import_table3.getTableName)(field.table)) {
              nullifyMap[objectName] = false;
            }
          }
        }
      }
      return result2;
    }, {});
    if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
      for (const [objectName, tableName] of Object.entries(nullifyMap)) {
        if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
          result[objectName] = null;
        }
      }
    }
    return result;
  }
  function orderSelectedFields(fields, pathPrefix) {
    return Object.entries(fields).reduce((result, [name, field]) => {
      if (typeof name !== "string") {
        return result;
      }
      const newPath = pathPrefix ? [...pathPrefix, name] : [name];
      if ((0, import_entity18.is)(field, import_column4.Column) || (0, import_entity18.is)(field, import_sql2.SQL) || (0, import_entity18.is)(field, import_sql2.SQL.Aliased) || (0, import_entity18.is)(field, import_subquery2.Subquery)) {
        result.push({ path: newPath, field });
      } else if ((0, import_entity18.is)(field, import_table3.Table)) {
        result.push(...orderSelectedFields(field[import_table3.Table.Symbol.Columns], newPath));
      } else {
        result.push(...orderSelectedFields(field, newPath));
      }
      return result;
    }, []);
  }
  function haveSameKeys(left, right) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    if (leftKeys.length !== rightKeys.length) {
      return false;
    }
    for (const [index, key] of leftKeys.entries()) {
      if (key !== rightKeys[index]) {
        return false;
      }
    }
    return true;
  }
  function mapUpdateSet(table, values) {
    const entries = Object.entries(values).filter(([, value]) => value !== undefined).map(([key, value]) => {
      if ((0, import_entity18.is)(value, import_sql2.SQL) || (0, import_entity18.is)(value, import_column4.Column)) {
        return [key, value];
      } else {
        return [key, new import_sql2.Param(value, table[import_table3.Table.Symbol.Columns][key])];
      }
    });
    if (entries.length === 0) {
      throw new Error("No values to set");
    }
    return Object.fromEntries(entries);
  }
  function applyMixins(baseClass, extendedClasses) {
    for (const extendedClass of extendedClasses) {
      for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
        if (name === "constructor")
          continue;
        Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null));
      }
    }
  }
  function getTableColumns(table) {
    return table[import_table3.Table.Symbol.Columns];
  }
  function getViewSelectedFields(view) {
    return view[import_view_common2.ViewBaseConfig].selectedFields;
  }
  function getTableLikeName(table) {
    return (0, import_entity18.is)(table, import_subquery2.Subquery) ? table._.alias : (0, import_entity18.is)(table, import_sql2.View) ? table[import_view_common2.ViewBaseConfig].name : (0, import_entity18.is)(table, import_sql2.SQL) ? undefined : table[import_table3.Table.Symbol.IsAlias] ? table[import_table3.Table.Symbol.Name] : table[import_table3.Table.Symbol.BaseName];
  }
  function getColumnNameAndConfig2(a, b) {
    return {
      name: typeof a === "string" && a.length > 0 ? a : "",
      config: typeof a === "object" ? a : b
    };
  }
  function isConfig(data) {
    if (typeof data !== "object" || data === null)
      return false;
    if (data.constructor.name !== "Object")
      return false;
    if ("logger" in data) {
      const type = typeof data["logger"];
      if (type !== "boolean" && (type !== "object" || typeof data["logger"]["logQuery"] !== "function") && type !== "undefined")
        return false;
      return true;
    }
    if ("schema" in data) {
      const type = typeof data["schema"];
      if (type !== "object" && type !== "undefined")
        return false;
      return true;
    }
    if ("casing" in data) {
      const type = typeof data["casing"];
      if (type !== "string" && type !== "undefined")
        return false;
      return true;
    }
    if ("mode" in data) {
      if (data["mode"] !== "default" || data["mode"] !== "planetscale" || data["mode"] !== undefined)
        return false;
      return true;
    }
    if ("connection" in data) {
      const type = typeof data["connection"];
      if (type !== "string" && type !== "object" && type !== "undefined")
        return false;
      return true;
    }
    if ("client" in data) {
      const type = typeof data["client"];
      if (type !== "object" && type !== "function" && type !== "undefined")
        return false;
      return true;
    }
    if (Object.keys(data).length === 0)
      return true;
    return false;
  }
  var textDecoder2 = typeof TextDecoder === "undefined" ? null : new TextDecoder;
});

// node_modules/drizzle-orm/pg-core/columns/int.common.cjs
var require_int_common = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var int_common_exports = {};
  __export2(int_common_exports, {
    PgIntColumnBaseBuilder: () => PgIntColumnBaseBuilder
  });
  module.exports = __toCommonJS(int_common_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgIntColumnBaseBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgIntColumnBaseBuilder";
    generatedAlwaysAsIdentity(sequence) {
      if (sequence) {
        const { name, ...options } = sequence;
        this.config.generatedIdentity = {
          type: "always",
          sequenceName: name,
          sequenceOptions: options
        };
      } else {
        this.config.generatedIdentity = {
          type: "always"
        };
      }
      this.config.hasDefault = true;
      this.config.notNull = true;
      return this;
    }
    generatedByDefaultAsIdentity(sequence) {
      if (sequence) {
        const { name, ...options } = sequence;
        this.config.generatedIdentity = {
          type: "byDefault",
          sequenceName: name,
          sequenceOptions: options
        };
      } else {
        this.config.generatedIdentity = {
          type: "byDefault"
        };
      }
      this.config.hasDefault = true;
      this.config.notNull = true;
      return this;
    }
  }
});

// node_modules/drizzle-orm/pg-core/columns/bigint.cjs
var require_bigint = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var bigint_exports = {};
  __export2(bigint_exports, {
    PgBigInt53: () => PgBigInt53,
    PgBigInt53Builder: () => PgBigInt53Builder,
    PgBigInt64: () => PgBigInt64,
    PgBigInt64Builder: () => PgBigInt64Builder,
    bigint: () => bigint
  });
  module.exports = __toCommonJS(bigint_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();
  var import_int_common = require_int_common();

  class PgBigInt53Builder extends import_int_common.PgIntColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgBigInt53Builder";
    constructor(name) {
      super(name, "number", "PgBigInt53");
    }
    build(table) {
      return new PgBigInt53(table, this.config);
    }
  }

  class PgBigInt53 extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgBigInt53";
    getSQLType() {
      return "bigint";
    }
    mapFromDriverValue(value) {
      if (typeof value === "number") {
        return value;
      }
      return Number(value);
    }
  }

  class PgBigInt64Builder extends import_int_common.PgIntColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgBigInt64Builder";
    constructor(name) {
      super(name, "bigint", "PgBigInt64");
    }
    build(table) {
      return new PgBigInt64(table, this.config);
    }
  }

  class PgBigInt64 extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgBigInt64";
    getSQLType() {
      return "bigint";
    }
    mapFromDriverValue(value) {
      return BigInt(value);
    }
  }
  function bigint(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (config.mode === "number") {
      return new PgBigInt53Builder(name);
    }
    return new PgBigInt64Builder(name);
  }
});

// node_modules/drizzle-orm/pg-core/columns/bigserial.cjs
var require_bigserial = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var bigserial_exports = {};
  __export2(bigserial_exports, {
    PgBigSerial53: () => PgBigSerial53,
    PgBigSerial53Builder: () => PgBigSerial53Builder,
    PgBigSerial64: () => PgBigSerial64,
    PgBigSerial64Builder: () => PgBigSerial64Builder,
    bigserial: () => bigserial
  });
  module.exports = __toCommonJS(bigserial_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgBigSerial53Builder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgBigSerial53Builder";
    constructor(name) {
      super(name, "number", "PgBigSerial53");
      this.config.hasDefault = true;
      this.config.notNull = true;
    }
    build(table) {
      return new PgBigSerial53(table, this.config);
    }
  }

  class PgBigSerial53 extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgBigSerial53";
    getSQLType() {
      return "bigserial";
    }
    mapFromDriverValue(value) {
      if (typeof value === "number") {
        return value;
      }
      return Number(value);
    }
  }

  class PgBigSerial64Builder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgBigSerial64Builder";
    constructor(name) {
      super(name, "bigint", "PgBigSerial64");
      this.config.hasDefault = true;
    }
    build(table) {
      return new PgBigSerial64(table, this.config);
    }
  }

  class PgBigSerial64 extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgBigSerial64";
    getSQLType() {
      return "bigserial";
    }
    mapFromDriverValue(value) {
      return BigInt(value);
    }
  }
  function bigserial(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (config.mode === "number") {
      return new PgBigSerial53Builder(name);
    }
    return new PgBigSerial64Builder(name);
  }
});

// node_modules/drizzle-orm/pg-core/columns/boolean.cjs
var require_boolean = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var boolean_exports = {};
  __export2(boolean_exports, {
    PgBoolean: () => PgBoolean,
    PgBooleanBuilder: () => PgBooleanBuilder,
    boolean: () => boolean
  });
  module.exports = __toCommonJS(boolean_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgBooleanBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgBooleanBuilder";
    constructor(name) {
      super(name, "boolean", "PgBoolean");
    }
    build(table) {
      return new PgBoolean(table, this.config);
    }
  }

  class PgBoolean extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgBoolean";
    getSQLType() {
      return "boolean";
    }
  }
  function boolean(name) {
    return new PgBooleanBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/char.cjs
var require_char = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var char_exports = {};
  __export2(char_exports, {
    PgChar: () => PgChar,
    PgCharBuilder: () => PgCharBuilder,
    char: () => char
  });
  module.exports = __toCommonJS(char_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgCharBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgCharBuilder";
    constructor(name, config) {
      super(name, "string", "PgChar");
      this.config.length = config.length;
      this.config.enumValues = config.enum;
    }
    build(table) {
      return new PgChar(table, this.config);
    }
  }

  class PgChar extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgChar";
    length = this.config.length;
    enumValues = this.config.enumValues;
    getSQLType() {
      return this.length === undefined ? `char` : `char(${this.length})`;
    }
  }
  function char(a, b = {}) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgCharBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/cidr.cjs
var require_cidr = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var cidr_exports = {};
  __export2(cidr_exports, {
    PgCidr: () => PgCidr,
    PgCidrBuilder: () => PgCidrBuilder,
    cidr: () => cidr
  });
  module.exports = __toCommonJS(cidr_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgCidrBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgCidrBuilder";
    constructor(name) {
      super(name, "string", "PgCidr");
    }
    build(table) {
      return new PgCidr(table, this.config);
    }
  }

  class PgCidr extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgCidr";
    getSQLType() {
      return "cidr";
    }
  }
  function cidr(name) {
    return new PgCidrBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/custom.cjs
var require_custom = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var custom_exports = {};
  __export2(custom_exports, {
    PgCustomColumn: () => PgCustomColumn,
    PgCustomColumnBuilder: () => PgCustomColumnBuilder,
    customType: () => customType2
  });
  module.exports = __toCommonJS(custom_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgCustomColumnBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgCustomColumnBuilder";
    constructor(name, fieldConfig, customTypeParams) {
      super(name, "custom", "PgCustomColumn");
      this.config.fieldConfig = fieldConfig;
      this.config.customTypeParams = customTypeParams;
    }
    build(table) {
      return new PgCustomColumn(table, this.config);
    }
  }

  class PgCustomColumn extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgCustomColumn";
    sqlName;
    mapTo;
    mapFrom;
    constructor(table, config) {
      super(table, config);
      this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
      this.mapTo = config.customTypeParams.toDriver;
      this.mapFrom = config.customTypeParams.fromDriver;
    }
    getSQLType() {
      return this.sqlName;
    }
    mapFromDriverValue(value) {
      return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
    }
    mapToDriverValue(value) {
      return typeof this.mapTo === "function" ? this.mapTo(value) : value;
    }
  }
  function customType2(customTypeParams) {
    return (a, b) => {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgCustomColumnBuilder(name, config, customTypeParams);
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/date.common.cjs
var require_date_common = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var date_common_exports = {};
  __export2(date_common_exports, {
    PgDateColumnBaseBuilder: () => PgDateColumnBaseBuilder
  });
  module.exports = __toCommonJS(date_common_exports);
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  var import_common8 = require_common();

  class PgDateColumnBaseBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgDateColumnBaseBuilder";
    defaultNow() {
      return this.default(import_sql2.sql`now()`);
    }
  }
});

// node_modules/drizzle-orm/pg-core/columns/date.cjs
var require_date = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var date_exports = {};
  __export2(date_exports, {
    PgDate: () => PgDate,
    PgDateBuilder: () => PgDateBuilder,
    PgDateString: () => PgDateString,
    PgDateStringBuilder: () => PgDateStringBuilder,
    date: () => date
  });
  module.exports = __toCommonJS(date_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();
  var import_date_common = require_date_common();

  class PgDateBuilder extends import_date_common.PgDateColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgDateBuilder";
    constructor(name) {
      super(name, "date", "PgDate");
    }
    build(table) {
      return new PgDate(table, this.config);
    }
  }

  class PgDate extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgDate";
    getSQLType() {
      return "date";
    }
    mapFromDriverValue(value) {
      if (typeof value === "string")
        return new Date(value);
      return value;
    }
    mapToDriverValue(value) {
      return value.toISOString();
    }
  }

  class PgDateStringBuilder extends import_date_common.PgDateColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgDateStringBuilder";
    constructor(name) {
      super(name, "string", "PgDateString");
    }
    build(table) {
      return new PgDateString(table, this.config);
    }
  }

  class PgDateString extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgDateString";
    getSQLType() {
      return "date";
    }
    mapFromDriverValue(value) {
      if (typeof value === "string")
        return value;
      return value.toISOString().slice(0, -14);
    }
  }
  function date(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (config?.mode === "date") {
      return new PgDateBuilder(name);
    }
    return new PgDateStringBuilder(name);
  }
});

// node_modules/drizzle-orm/pg-core/columns/double-precision.cjs
var require_double_precision = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var double_precision_exports = {};
  __export2(double_precision_exports, {
    PgDoublePrecision: () => PgDoublePrecision,
    PgDoublePrecisionBuilder: () => PgDoublePrecisionBuilder,
    doublePrecision: () => doublePrecision
  });
  module.exports = __toCommonJS(double_precision_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgDoublePrecisionBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgDoublePrecisionBuilder";
    constructor(name) {
      super(name, "number", "PgDoublePrecision");
    }
    build(table) {
      return new PgDoublePrecision(table, this.config);
    }
  }

  class PgDoublePrecision extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgDoublePrecision";
    getSQLType() {
      return "double precision";
    }
    mapFromDriverValue(value) {
      if (typeof value === "string") {
        return Number.parseFloat(value);
      }
      return value;
    }
  }
  function doublePrecision(name) {
    return new PgDoublePrecisionBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/inet.cjs
var require_inet = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var inet_exports = {};
  __export2(inet_exports, {
    PgInet: () => PgInet,
    PgInetBuilder: () => PgInetBuilder,
    inet: () => inet
  });
  module.exports = __toCommonJS(inet_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgInetBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgInetBuilder";
    constructor(name) {
      super(name, "string", "PgInet");
    }
    build(table) {
      return new PgInet(table, this.config);
    }
  }

  class PgInet extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgInet";
    getSQLType() {
      return "inet";
    }
  }
  function inet(name) {
    return new PgInetBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/integer.cjs
var require_integer = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var integer_exports = {};
  __export2(integer_exports, {
    PgInteger: () => PgInteger,
    PgIntegerBuilder: () => PgIntegerBuilder,
    integer: () => integer2
  });
  module.exports = __toCommonJS(integer_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();
  var import_int_common = require_int_common();

  class PgIntegerBuilder extends import_int_common.PgIntColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgIntegerBuilder";
    constructor(name) {
      super(name, "number", "PgInteger");
    }
    build(table) {
      return new PgInteger(table, this.config);
    }
  }

  class PgInteger extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgInteger";
    getSQLType() {
      return "integer";
    }
    mapFromDriverValue(value) {
      if (typeof value === "string") {
        return Number.parseInt(value);
      }
      return value;
    }
  }
  function integer2(name) {
    return new PgIntegerBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/interval.cjs
var require_interval = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var interval_exports = {};
  __export2(interval_exports, {
    PgInterval: () => PgInterval,
    PgIntervalBuilder: () => PgIntervalBuilder,
    interval: () => interval
  });
  module.exports = __toCommonJS(interval_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgIntervalBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgIntervalBuilder";
    constructor(name, intervalConfig) {
      super(name, "string", "PgInterval");
      this.config.intervalConfig = intervalConfig;
    }
    build(table) {
      return new PgInterval(table, this.config);
    }
  }

  class PgInterval extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgInterval";
    fields = this.config.intervalConfig.fields;
    precision = this.config.intervalConfig.precision;
    getSQLType() {
      const fields = this.fields ? ` ${this.fields}` : "";
      const precision = this.precision ? `(${this.precision})` : "";
      return `interval${fields}${precision}`;
    }
  }
  function interval(a, b = {}) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgIntervalBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/json.cjs
var require_json = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var json_exports = {};
  __export2(json_exports, {
    PgJson: () => PgJson,
    PgJsonBuilder: () => PgJsonBuilder,
    json: () => json
  });
  module.exports = __toCommonJS(json_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgJsonBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgJsonBuilder";
    constructor(name) {
      super(name, "json", "PgJson");
    }
    build(table) {
      return new PgJson(table, this.config);
    }
  }

  class PgJson extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgJson";
    constructor(table, config) {
      super(table, config);
    }
    getSQLType() {
      return "json";
    }
    mapToDriverValue(value) {
      return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    }
  }
  function json(name) {
    return new PgJsonBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/jsonb.cjs
var require_jsonb = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var jsonb_exports = {};
  __export2(jsonb_exports, {
    PgJsonb: () => PgJsonb,
    PgJsonbBuilder: () => PgJsonbBuilder,
    jsonb: () => jsonb
  });
  module.exports = __toCommonJS(jsonb_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgJsonbBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgJsonbBuilder";
    constructor(name) {
      super(name, "json", "PgJsonb");
    }
    build(table) {
      return new PgJsonb(table, this.config);
    }
  }

  class PgJsonb extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgJsonb";
    constructor(table, config) {
      super(table, config);
    }
    getSQLType() {
      return "jsonb";
    }
    mapToDriverValue(value) {
      return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    }
  }
  function jsonb(name) {
    return new PgJsonbBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/line.cjs
var require_line = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var line_exports = {};
  __export2(line_exports, {
    PgLineABC: () => PgLineABC,
    PgLineABCBuilder: () => PgLineABCBuilder,
    PgLineBuilder: () => PgLineBuilder,
    PgLineTuple: () => PgLineTuple,
    line: () => line
  });
  module.exports = __toCommonJS(line_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgLineBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgLineBuilder";
    constructor(name) {
      super(name, "array", "PgLine");
    }
    build(table) {
      return new PgLineTuple(table, this.config);
    }
  }

  class PgLineTuple extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgLine";
    getSQLType() {
      return "line";
    }
    mapFromDriverValue(value) {
      const [a, b, c] = value.slice(1, -1).split(",");
      return [Number.parseFloat(a), Number.parseFloat(b), Number.parseFloat(c)];
    }
    mapToDriverValue(value) {
      return `{${value[0]},${value[1]},${value[2]}}`;
    }
  }

  class PgLineABCBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgLineABCBuilder";
    constructor(name) {
      super(name, "json", "PgLineABC");
    }
    build(table) {
      return new PgLineABC(table, this.config);
    }
  }

  class PgLineABC extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgLineABC";
    getSQLType() {
      return "line";
    }
    mapFromDriverValue(value) {
      const [a, b, c] = value.slice(1, -1).split(",");
      return { a: Number.parseFloat(a), b: Number.parseFloat(b), c: Number.parseFloat(c) };
    }
    mapToDriverValue(value) {
      return `{${value.a},${value.b},${value.c}}`;
    }
  }
  function line(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (!config?.mode || config.mode === "tuple") {
      return new PgLineBuilder(name);
    }
    return new PgLineABCBuilder(name);
  }
});

// node_modules/drizzle-orm/pg-core/columns/macaddr.cjs
var require_macaddr = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var macaddr_exports = {};
  __export2(macaddr_exports, {
    PgMacaddr: () => PgMacaddr,
    PgMacaddrBuilder: () => PgMacaddrBuilder,
    macaddr: () => macaddr
  });
  module.exports = __toCommonJS(macaddr_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgMacaddrBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgMacaddrBuilder";
    constructor(name) {
      super(name, "string", "PgMacaddr");
    }
    build(table) {
      return new PgMacaddr(table, this.config);
    }
  }

  class PgMacaddr extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgMacaddr";
    getSQLType() {
      return "macaddr";
    }
  }
  function macaddr(name) {
    return new PgMacaddrBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/macaddr8.cjs
var require_macaddr8 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var macaddr8_exports = {};
  __export2(macaddr8_exports, {
    PgMacaddr8: () => PgMacaddr8,
    PgMacaddr8Builder: () => PgMacaddr8Builder,
    macaddr8: () => macaddr8
  });
  module.exports = __toCommonJS(macaddr8_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgMacaddr8Builder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgMacaddr8Builder";
    constructor(name) {
      super(name, "string", "PgMacaddr8");
    }
    build(table) {
      return new PgMacaddr8(table, this.config);
    }
  }

  class PgMacaddr8 extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgMacaddr8";
    getSQLType() {
      return "macaddr8";
    }
  }
  function macaddr8(name) {
    return new PgMacaddr8Builder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/numeric.cjs
var require_numeric = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var numeric_exports = {};
  __export2(numeric_exports, {
    PgNumeric: () => PgNumeric,
    PgNumericBigInt: () => PgNumericBigInt,
    PgNumericBigIntBuilder: () => PgNumericBigIntBuilder,
    PgNumericBuilder: () => PgNumericBuilder,
    PgNumericNumber: () => PgNumericNumber,
    PgNumericNumberBuilder: () => PgNumericNumberBuilder,
    decimal: () => decimal,
    numeric: () => numeric2
  });
  module.exports = __toCommonJS(numeric_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgNumericBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgNumericBuilder";
    constructor(name, precision, scale) {
      super(name, "string", "PgNumeric");
      this.config.precision = precision;
      this.config.scale = scale;
    }
    build(table) {
      return new PgNumeric(table, this.config);
    }
  }

  class PgNumeric extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgNumeric";
    precision;
    scale;
    constructor(table, config) {
      super(table, config);
      this.precision = config.precision;
      this.scale = config.scale;
    }
    mapFromDriverValue(value) {
      if (typeof value === "string")
        return value;
      return String(value);
    }
    getSQLType() {
      if (this.precision !== undefined && this.scale !== undefined) {
        return `numeric(${this.precision}, ${this.scale})`;
      } else if (this.precision === undefined) {
        return "numeric";
      } else {
        return `numeric(${this.precision})`;
      }
    }
  }

  class PgNumericNumberBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgNumericNumberBuilder";
    constructor(name, precision, scale) {
      super(name, "number", "PgNumericNumber");
      this.config.precision = precision;
      this.config.scale = scale;
    }
    build(table) {
      return new PgNumericNumber(table, this.config);
    }
  }

  class PgNumericNumber extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgNumericNumber";
    precision;
    scale;
    constructor(table, config) {
      super(table, config);
      this.precision = config.precision;
      this.scale = config.scale;
    }
    mapFromDriverValue(value) {
      if (typeof value === "number")
        return value;
      return Number(value);
    }
    mapToDriverValue = String;
    getSQLType() {
      if (this.precision !== undefined && this.scale !== undefined) {
        return `numeric(${this.precision}, ${this.scale})`;
      } else if (this.precision === undefined) {
        return "numeric";
      } else {
        return `numeric(${this.precision})`;
      }
    }
  }

  class PgNumericBigIntBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgNumericBigIntBuilder";
    constructor(name, precision, scale) {
      super(name, "bigint", "PgNumericBigInt");
      this.config.precision = precision;
      this.config.scale = scale;
    }
    build(table) {
      return new PgNumericBigInt(table, this.config);
    }
  }

  class PgNumericBigInt extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgNumericBigInt";
    precision;
    scale;
    constructor(table, config) {
      super(table, config);
      this.precision = config.precision;
      this.scale = config.scale;
    }
    mapFromDriverValue = BigInt;
    mapToDriverValue = String;
    getSQLType() {
      if (this.precision !== undefined && this.scale !== undefined) {
        return `numeric(${this.precision}, ${this.scale})`;
      } else if (this.precision === undefined) {
        return "numeric";
      } else {
        return `numeric(${this.precision})`;
      }
    }
  }
  function numeric2(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    const mode = config?.mode;
    return mode === "number" ? new PgNumericNumberBuilder(name, config?.precision, config?.scale) : mode === "bigint" ? new PgNumericBigIntBuilder(name, config?.precision, config?.scale) : new PgNumericBuilder(name, config?.precision, config?.scale);
  }
  var decimal = numeric2;
});

// node_modules/drizzle-orm/pg-core/columns/point.cjs
var require_point = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var point_exports = {};
  __export2(point_exports, {
    PgPointObject: () => PgPointObject,
    PgPointObjectBuilder: () => PgPointObjectBuilder,
    PgPointTuple: () => PgPointTuple,
    PgPointTupleBuilder: () => PgPointTupleBuilder,
    point: () => point
  });
  module.exports = __toCommonJS(point_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgPointTupleBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgPointTupleBuilder";
    constructor(name) {
      super(name, "array", "PgPointTuple");
    }
    build(table) {
      return new PgPointTuple(table, this.config);
    }
  }

  class PgPointTuple extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgPointTuple";
    getSQLType() {
      return "point";
    }
    mapFromDriverValue(value) {
      if (typeof value === "string") {
        const [x, y] = value.slice(1, -1).split(",");
        return [Number.parseFloat(x), Number.parseFloat(y)];
      }
      return [value.x, value.y];
    }
    mapToDriverValue(value) {
      return `(${value[0]},${value[1]})`;
    }
  }

  class PgPointObjectBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgPointObjectBuilder";
    constructor(name) {
      super(name, "json", "PgPointObject");
    }
    build(table) {
      return new PgPointObject(table, this.config);
    }
  }

  class PgPointObject extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgPointObject";
    getSQLType() {
      return "point";
    }
    mapFromDriverValue(value) {
      if (typeof value === "string") {
        const [x, y] = value.slice(1, -1).split(",");
        return { x: Number.parseFloat(x), y: Number.parseFloat(y) };
      }
      return value;
    }
    mapToDriverValue(value) {
      return `(${value.x},${value.y})`;
    }
  }
  function point(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (!config?.mode || config.mode === "tuple") {
      return new PgPointTupleBuilder(name);
    }
    return new PgPointObjectBuilder(name);
  }
});

// node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.cjs
var require_utils2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var utils_exports = {};
  __export2(utils_exports, {
    parseEWKB: () => parseEWKB
  });
  module.exports = __toCommonJS(utils_exports);
  function hexToBytes(hex) {
    const bytes = [];
    for (let c = 0;c < hex.length; c += 2) {
      bytes.push(Number.parseInt(hex.slice(c, c + 2), 16));
    }
    return new Uint8Array(bytes);
  }
  function bytesToFloat64(bytes, offset) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    for (let i = 0;i < 8; i++) {
      view.setUint8(i, bytes[offset + i]);
    }
    return view.getFloat64(0, true);
  }
  function parseEWKB(hex) {
    const bytes = hexToBytes(hex);
    let offset = 0;
    const byteOrder = bytes[offset];
    offset += 1;
    const view = new DataView(bytes.buffer);
    const geomType = view.getUint32(offset, byteOrder === 1);
    offset += 4;
    let _srid;
    if (geomType & 536870912) {
      _srid = view.getUint32(offset, byteOrder === 1);
      offset += 4;
    }
    if ((geomType & 65535) === 1) {
      const x = bytesToFloat64(bytes, offset);
      offset += 8;
      const y = bytesToFloat64(bytes, offset);
      offset += 8;
      return [x, y];
    }
    throw new Error("Unsupported geometry type");
  }
});

// node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.cjs
var require_geometry = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var geometry_exports = {};
  __export2(geometry_exports, {
    PgGeometry: () => PgGeometry,
    PgGeometryBuilder: () => PgGeometryBuilder,
    PgGeometryObject: () => PgGeometryObject,
    PgGeometryObjectBuilder: () => PgGeometryObjectBuilder,
    geometry: () => geometry
  });
  module.exports = __toCommonJS(geometry_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();
  var import_utils22 = require_utils2();

  class PgGeometryBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgGeometryBuilder";
    constructor(name) {
      super(name, "array", "PgGeometry");
    }
    build(table) {
      return new PgGeometry(table, this.config);
    }
  }

  class PgGeometry extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgGeometry";
    getSQLType() {
      return "geometry(point)";
    }
    mapFromDriverValue(value) {
      return (0, import_utils22.parseEWKB)(value);
    }
    mapToDriverValue(value) {
      return `point(${value[0]} ${value[1]})`;
    }
  }

  class PgGeometryObjectBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgGeometryObjectBuilder";
    constructor(name) {
      super(name, "json", "PgGeometryObject");
    }
    build(table) {
      return new PgGeometryObject(table, this.config);
    }
  }

  class PgGeometryObject extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgGeometryObject";
    getSQLType() {
      return "geometry(point)";
    }
    mapFromDriverValue(value) {
      const parsed = (0, import_utils22.parseEWKB)(value);
      return { x: parsed[0], y: parsed[1] };
    }
    mapToDriverValue(value) {
      return `point(${value.x} ${value.y})`;
    }
  }
  function geometry(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (!config?.mode || config.mode === "tuple") {
      return new PgGeometryBuilder(name);
    }
    return new PgGeometryObjectBuilder(name);
  }
});

// node_modules/drizzle-orm/pg-core/columns/real.cjs
var require_real = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var real_exports = {};
  __export2(real_exports, {
    PgReal: () => PgReal,
    PgRealBuilder: () => PgRealBuilder,
    real: () => real2
  });
  module.exports = __toCommonJS(real_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgRealBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgRealBuilder";
    constructor(name, length) {
      super(name, "number", "PgReal");
      this.config.length = length;
    }
    build(table) {
      return new PgReal(table, this.config);
    }
  }

  class PgReal extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgReal";
    constructor(table, config) {
      super(table, config);
    }
    getSQLType() {
      return "real";
    }
    mapFromDriverValue = (value) => {
      if (typeof value === "string") {
        return Number.parseFloat(value);
      }
      return value;
    };
  }
  function real2(name) {
    return new PgRealBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/serial.cjs
var require_serial = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var serial_exports = {};
  __export2(serial_exports, {
    PgSerial: () => PgSerial,
    PgSerialBuilder: () => PgSerialBuilder,
    serial: () => serial
  });
  module.exports = __toCommonJS(serial_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgSerialBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgSerialBuilder";
    constructor(name) {
      super(name, "number", "PgSerial");
      this.config.hasDefault = true;
      this.config.notNull = true;
    }
    build(table) {
      return new PgSerial(table, this.config);
    }
  }

  class PgSerial extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgSerial";
    getSQLType() {
      return "serial";
    }
  }
  function serial(name) {
    return new PgSerialBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/smallint.cjs
var require_smallint = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var smallint_exports = {};
  __export2(smallint_exports, {
    PgSmallInt: () => PgSmallInt,
    PgSmallIntBuilder: () => PgSmallIntBuilder,
    smallint: () => smallint
  });
  module.exports = __toCommonJS(smallint_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();
  var import_int_common = require_int_common();

  class PgSmallIntBuilder extends import_int_common.PgIntColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgSmallIntBuilder";
    constructor(name) {
      super(name, "number", "PgSmallInt");
    }
    build(table) {
      return new PgSmallInt(table, this.config);
    }
  }

  class PgSmallInt extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgSmallInt";
    getSQLType() {
      return "smallint";
    }
    mapFromDriverValue = (value) => {
      if (typeof value === "string") {
        return Number(value);
      }
      return value;
    };
  }
  function smallint(name) {
    return new PgSmallIntBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/smallserial.cjs
var require_smallserial = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var smallserial_exports = {};
  __export2(smallserial_exports, {
    PgSmallSerial: () => PgSmallSerial,
    PgSmallSerialBuilder: () => PgSmallSerialBuilder,
    smallserial: () => smallserial
  });
  module.exports = __toCommonJS(smallserial_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common();

  class PgSmallSerialBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgSmallSerialBuilder";
    constructor(name) {
      super(name, "number", "PgSmallSerial");
      this.config.hasDefault = true;
      this.config.notNull = true;
    }
    build(table) {
      return new PgSmallSerial(table, this.config);
    }
  }

  class PgSmallSerial extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgSmallSerial";
    getSQLType() {
      return "smallserial";
    }
  }
  function smallserial(name) {
    return new PgSmallSerialBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/text.cjs
var require_text = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var text_exports = {};
  __export2(text_exports, {
    PgText: () => PgText,
    PgTextBuilder: () => PgTextBuilder,
    text: () => text2
  });
  module.exports = __toCommonJS(text_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgTextBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgTextBuilder";
    constructor(name, config) {
      super(name, "string", "PgText");
      this.config.enumValues = config.enum;
    }
    build(table) {
      return new PgText(table, this.config);
    }
  }

  class PgText extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgText";
    enumValues = this.config.enumValues;
    getSQLType() {
      return "text";
    }
  }
  function text2(a, b = {}) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgTextBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/time.cjs
var require_time = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var time_exports = {};
  __export2(time_exports, {
    PgTime: () => PgTime,
    PgTimeBuilder: () => PgTimeBuilder,
    time: () => time
  });
  module.exports = __toCommonJS(time_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();
  var import_date_common = require_date_common();

  class PgTimeBuilder extends import_date_common.PgDateColumnBaseBuilder {
    constructor(name, withTimezone, precision) {
      super(name, "string", "PgTime");
      this.withTimezone = withTimezone;
      this.precision = precision;
      this.config.withTimezone = withTimezone;
      this.config.precision = precision;
    }
    static [import_entity18.entityKind] = "PgTimeBuilder";
    build(table) {
      return new PgTime(table, this.config);
    }
  }

  class PgTime extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgTime";
    withTimezone;
    precision;
    constructor(table, config) {
      super(table, config);
      this.withTimezone = config.withTimezone;
      this.precision = config.precision;
    }
    getSQLType() {
      const precision = this.precision === undefined ? "" : `(${this.precision})`;
      return `time${precision}${this.withTimezone ? " with time zone" : ""}`;
    }
  }
  function time(a, b = {}) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgTimeBuilder(name, config.withTimezone ?? false, config.precision);
  }
});

// node_modules/drizzle-orm/pg-core/columns/timestamp.cjs
var require_timestamp = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var timestamp_exports = {};
  __export2(timestamp_exports, {
    PgTimestamp: () => PgTimestamp,
    PgTimestampBuilder: () => PgTimestampBuilder,
    PgTimestampString: () => PgTimestampString,
    PgTimestampStringBuilder: () => PgTimestampStringBuilder,
    timestamp: () => timestamp
  });
  module.exports = __toCommonJS(timestamp_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();
  var import_date_common = require_date_common();

  class PgTimestampBuilder extends import_date_common.PgDateColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgTimestampBuilder";
    constructor(name, withTimezone, precision) {
      super(name, "date", "PgTimestamp");
      this.config.withTimezone = withTimezone;
      this.config.precision = precision;
    }
    build(table) {
      return new PgTimestamp(table, this.config);
    }
  }

  class PgTimestamp extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgTimestamp";
    withTimezone;
    precision;
    constructor(table, config) {
      super(table, config);
      this.withTimezone = config.withTimezone;
      this.precision = config.precision;
    }
    getSQLType() {
      const precision = this.precision === undefined ? "" : ` (${this.precision})`;
      return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
    }
    mapFromDriverValue(value) {
      if (typeof value === "string")
        return new Date(this.withTimezone ? value : value + "+0000");
      return value;
    }
    mapToDriverValue = (value) => {
      return value.toISOString();
    };
  }

  class PgTimestampStringBuilder extends import_date_common.PgDateColumnBaseBuilder {
    static [import_entity18.entityKind] = "PgTimestampStringBuilder";
    constructor(name, withTimezone, precision) {
      super(name, "string", "PgTimestampString");
      this.config.withTimezone = withTimezone;
      this.config.precision = precision;
    }
    build(table) {
      return new PgTimestampString(table, this.config);
    }
  }

  class PgTimestampString extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgTimestampString";
    withTimezone;
    precision;
    constructor(table, config) {
      super(table, config);
      this.withTimezone = config.withTimezone;
      this.precision = config.precision;
    }
    getSQLType() {
      const precision = this.precision === undefined ? "" : `(${this.precision})`;
      return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
    }
    mapFromDriverValue(value) {
      if (typeof value === "string")
        return value;
      const shortened = value.toISOString().slice(0, -1).replace("T", " ");
      if (this.withTimezone) {
        const offset = value.getTimezoneOffset();
        const sign = offset <= 0 ? "+" : "-";
        return `${shortened}${sign}${Math.floor(Math.abs(offset) / 60).toString().padStart(2, "0")}`;
      }
      return shortened;
    }
  }
  function timestamp(a, b = {}) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (config?.mode === "string") {
      return new PgTimestampStringBuilder(name, config.withTimezone ?? false, config.precision);
    }
    return new PgTimestampBuilder(name, config?.withTimezone ?? false, config?.precision);
  }
});

// node_modules/drizzle-orm/pg-core/columns/uuid.cjs
var require_uuid = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var uuid_exports = {};
  __export2(uuid_exports, {
    PgUUID: () => PgUUID,
    PgUUIDBuilder: () => PgUUIDBuilder,
    uuid: () => uuid
  });
  module.exports = __toCommonJS(uuid_exports);
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  var import_common8 = require_common();

  class PgUUIDBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgUUIDBuilder";
    constructor(name) {
      super(name, "string", "PgUUID");
    }
    defaultRandom() {
      return this.default(import_sql2.sql`gen_random_uuid()`);
    }
    build(table) {
      return new PgUUID(table, this.config);
    }
  }

  class PgUUID extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgUUID";
    getSQLType() {
      return "uuid";
    }
  }
  function uuid(name) {
    return new PgUUIDBuilder(name ?? "");
  }
});

// node_modules/drizzle-orm/pg-core/columns/varchar.cjs
var require_varchar = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var varchar_exports = {};
  __export2(varchar_exports, {
    PgVarchar: () => PgVarchar,
    PgVarcharBuilder: () => PgVarcharBuilder,
    varchar: () => varchar
  });
  module.exports = __toCommonJS(varchar_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgVarcharBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgVarcharBuilder";
    constructor(name, config) {
      super(name, "string", "PgVarchar");
      this.config.length = config.length;
      this.config.enumValues = config.enum;
    }
    build(table) {
      return new PgVarchar(table, this.config);
    }
  }

  class PgVarchar extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgVarchar";
    length = this.config.length;
    enumValues = this.config.enumValues;
    getSQLType() {
      return this.length === undefined ? `varchar` : `varchar(${this.length})`;
    }
  }
  function varchar(a, b = {}) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgVarcharBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.cjs
var require_bit = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var bit_exports = {};
  __export2(bit_exports, {
    PgBinaryVector: () => PgBinaryVector,
    PgBinaryVectorBuilder: () => PgBinaryVectorBuilder,
    bit: () => bit
  });
  module.exports = __toCommonJS(bit_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgBinaryVectorBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgBinaryVectorBuilder";
    constructor(name, config) {
      super(name, "string", "PgBinaryVector");
      this.config.dimensions = config.dimensions;
    }
    build(table) {
      return new PgBinaryVector(table, this.config);
    }
  }

  class PgBinaryVector extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgBinaryVector";
    dimensions = this.config.dimensions;
    getSQLType() {
      return `bit(${this.dimensions})`;
    }
  }
  function bit(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgBinaryVectorBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.cjs
var require_halfvec = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var halfvec_exports = {};
  __export2(halfvec_exports, {
    PgHalfVector: () => PgHalfVector,
    PgHalfVectorBuilder: () => PgHalfVectorBuilder,
    halfvec: () => halfvec
  });
  module.exports = __toCommonJS(halfvec_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgHalfVectorBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgHalfVectorBuilder";
    constructor(name, config) {
      super(name, "array", "PgHalfVector");
      this.config.dimensions = config.dimensions;
    }
    build(table) {
      return new PgHalfVector(table, this.config);
    }
  }

  class PgHalfVector extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgHalfVector";
    dimensions = this.config.dimensions;
    getSQLType() {
      return `halfvec(${this.dimensions})`;
    }
    mapToDriverValue(value) {
      return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
      return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
    }
  }
  function halfvec(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgHalfVectorBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.cjs
var require_sparsevec = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var sparsevec_exports = {};
  __export2(sparsevec_exports, {
    PgSparseVector: () => PgSparseVector,
    PgSparseVectorBuilder: () => PgSparseVectorBuilder,
    sparsevec: () => sparsevec
  });
  module.exports = __toCommonJS(sparsevec_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgSparseVectorBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgSparseVectorBuilder";
    constructor(name, config) {
      super(name, "string", "PgSparseVector");
      this.config.dimensions = config.dimensions;
    }
    build(table) {
      return new PgSparseVector(table, this.config);
    }
  }

  class PgSparseVector extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgSparseVector";
    dimensions = this.config.dimensions;
    getSQLType() {
      return `sparsevec(${this.dimensions})`;
    }
  }
  function sparsevec(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgSparseVectorBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.cjs
var require_vector = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var vector_exports = {};
  __export2(vector_exports, {
    PgVector: () => PgVector,
    PgVectorBuilder: () => PgVectorBuilder,
    vector: () => vector
  });
  module.exports = __toCommonJS(vector_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common();

  class PgVectorBuilder extends import_common8.PgColumnBuilder {
    static [import_entity18.entityKind] = "PgVectorBuilder";
    constructor(name, config) {
      super(name, "array", "PgVector");
      this.config.dimensions = config.dimensions;
    }
    build(table) {
      return new PgVector(table, this.config);
    }
  }

  class PgVector extends import_common8.PgColumn {
    static [import_entity18.entityKind] = "PgVector";
    dimensions = this.config.dimensions;
    getSQLType() {
      return `vector(${this.dimensions})`;
    }
    mapToDriverValue(value) {
      return JSON.stringify(value);
    }
    mapFromDriverValue(value) {
      return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
    }
  }
  function vector(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    return new PgVectorBuilder(name, config);
  }
});

// node_modules/drizzle-orm/pg-core/columns/all.cjs
var require_all = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var all_exports = {};
  __export2(all_exports, {
    getPgColumnBuilders: () => getPgColumnBuilders
  });
  module.exports = __toCommonJS(all_exports);
  var import_bigint = require_bigint();
  var import_bigserial = require_bigserial();
  var import_boolean = require_boolean();
  var import_char = require_char();
  var import_cidr = require_cidr();
  var import_custom2 = require_custom();
  var import_date = require_date();
  var import_double_precision = require_double_precision();
  var import_inet = require_inet();
  var import_integer2 = require_integer();
  var import_interval = require_interval();
  var import_json = require_json();
  var import_jsonb = require_jsonb();
  var import_line = require_line();
  var import_macaddr = require_macaddr();
  var import_macaddr8 = require_macaddr8();
  var import_numeric2 = require_numeric();
  var import_point = require_point();
  var import_geometry = require_geometry();
  var import_real2 = require_real();
  var import_serial = require_serial();
  var import_smallint = require_smallint();
  var import_smallserial = require_smallserial();
  var import_text2 = require_text();
  var import_time = require_time();
  var import_timestamp = require_timestamp();
  var import_uuid = require_uuid();
  var import_varchar = require_varchar();
  var import_bit = require_bit();
  var import_halfvec = require_halfvec();
  var import_sparsevec = require_sparsevec();
  var import_vector = require_vector();
  function getPgColumnBuilders() {
    return {
      bigint: import_bigint.bigint,
      bigserial: import_bigserial.bigserial,
      boolean: import_boolean.boolean,
      char: import_char.char,
      cidr: import_cidr.cidr,
      customType: import_custom2.customType,
      date: import_date.date,
      doublePrecision: import_double_precision.doublePrecision,
      inet: import_inet.inet,
      integer: import_integer2.integer,
      interval: import_interval.interval,
      json: import_json.json,
      jsonb: import_jsonb.jsonb,
      line: import_line.line,
      macaddr: import_macaddr.macaddr,
      macaddr8: import_macaddr8.macaddr8,
      numeric: import_numeric2.numeric,
      point: import_point.point,
      geometry: import_geometry.geometry,
      real: import_real2.real,
      serial: import_serial.serial,
      smallint: import_smallint.smallint,
      smallserial: import_smallserial.smallserial,
      text: import_text2.text,
      time: import_time.time,
      timestamp: import_timestamp.timestamp,
      uuid: import_uuid.uuid,
      varchar: import_varchar.varchar,
      bit: import_bit.bit,
      halfvec: import_halfvec.halfvec,
      sparsevec: import_sparsevec.sparsevec,
      vector: import_vector.vector
    };
  }
});

// node_modules/drizzle-orm/pg-core/table.cjs
var require_table2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var table_exports = {};
  __export2(table_exports, {
    EnableRLS: () => EnableRLS,
    InlineForeignKeys: () => InlineForeignKeys2,
    PgTable: () => PgTable,
    pgTable: () => pgTable,
    pgTableCreator: () => pgTableCreator,
    pgTableWithSchema: () => pgTableWithSchema
  });
  module.exports = __toCommonJS(table_exports);
  var import_entity18 = require_entity();
  var import_table3 = require_table();
  var import_all2 = require_all();
  var InlineForeignKeys2 = Symbol.for("drizzle:PgInlineForeignKeys");
  var EnableRLS = Symbol.for("drizzle:EnableRLS");

  class PgTable extends import_table3.Table {
    static [import_entity18.entityKind] = "PgTable";
    static Symbol = Object.assign({}, import_table3.Table.Symbol, {
      InlineForeignKeys: InlineForeignKeys2,
      EnableRLS
    });
    [InlineForeignKeys2] = [];
    [EnableRLS] = false;
    [import_table3.Table.Symbol.ExtraConfigBuilder] = undefined;
    [import_table3.Table.Symbol.ExtraConfigColumns] = {};
  }
  function pgTableWithSchema(name, columns, extraConfig, schema, baseName = name) {
    const rawTable = new PgTable(name, schema, baseName);
    const parsedColumns = typeof columns === "function" ? columns((0, import_all2.getPgColumnBuilders)()) : columns;
    const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    }));
    const builtColumnsForExtraConfig = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.buildExtraConfigColumn(rawTable);
      return [name2, column];
    }));
    const table = Object.assign(rawTable, builtColumns);
    table[import_table3.Table.Symbol.Columns] = builtColumns;
    table[import_table3.Table.Symbol.ExtraConfigColumns] = builtColumnsForExtraConfig;
    if (extraConfig) {
      table[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
    }
    return Object.assign(table, {
      enableRLS: () => {
        table[PgTable.Symbol.EnableRLS] = true;
        return table;
      }
    });
  }
  var pgTable = (name, columns, extraConfig) => {
    return pgTableWithSchema(name, columns, extraConfig, undefined);
  };
  function pgTableCreator(customizeTableName) {
    return (name, columns, extraConfig) => {
      return pgTableWithSchema(customizeTableName(name), columns, extraConfig, undefined, name);
    };
  }
});

// node_modules/drizzle-orm/pg-core/primary-keys.cjs
var require_primary_keys = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var primary_keys_exports = {};
  __export2(primary_keys_exports, {
    PrimaryKey: () => PrimaryKey,
    PrimaryKeyBuilder: () => PrimaryKeyBuilder,
    primaryKey: () => primaryKey
  });
  module.exports = __toCommonJS(primary_keys_exports);
  var import_entity18 = require_entity();
  var import_table3 = require_table2();
  function primaryKey(...config) {
    if (config[0].columns) {
      return new PrimaryKeyBuilder(config[0].columns, config[0].name);
    }
    return new PrimaryKeyBuilder(config);
  }

  class PrimaryKeyBuilder {
    static [import_entity18.entityKind] = "PgPrimaryKeyBuilder";
    columns;
    name;
    constructor(columns, name) {
      this.columns = columns;
      this.name = name;
    }
    build(table) {
      return new PrimaryKey(table, this.columns, this.name);
    }
  }

  class PrimaryKey {
    constructor(table, columns, name) {
      this.table = table;
      this.columns = columns;
      this.name = name;
    }
    static [import_entity18.entityKind] = "PgPrimaryKey";
    columns;
    name;
    getName() {
      return this.name ?? `${this.table[import_table3.PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
    }
  }
});

// node_modules/drizzle-orm/sql/expressions/conditions.cjs
var require_conditions = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var conditions_exports = {};
  __export2(conditions_exports, {
    and: () => and,
    arrayContained: () => arrayContained,
    arrayContains: () => arrayContains,
    arrayOverlaps: () => arrayOverlaps,
    between: () => between,
    bindIfParam: () => bindIfParam,
    eq: () => eq,
    exists: () => exists,
    gt: () => gt,
    gte: () => gte,
    ilike: () => ilike,
    inArray: () => inArray,
    isNotNull: () => isNotNull,
    isNull: () => isNull,
    like: () => like,
    lt: () => lt,
    lte: () => lte,
    ne: () => ne,
    not: () => not,
    notBetween: () => notBetween,
    notExists: () => notExists,
    notIlike: () => notIlike,
    notInArray: () => notInArray,
    notLike: () => notLike,
    or: () => or
  });
  module.exports = __toCommonJS(conditions_exports);
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_table3 = require_table();
  var import_sql2 = require_sql();
  function bindIfParam(value, column) {
    if ((0, import_sql2.isDriverValueEncoder)(column) && !(0, import_sql2.isSQLWrapper)(value) && !(0, import_entity18.is)(value, import_sql2.Param) && !(0, import_entity18.is)(value, import_sql2.Placeholder) && !(0, import_entity18.is)(value, import_column4.Column) && !(0, import_entity18.is)(value, import_table3.Table) && !(0, import_entity18.is)(value, import_sql2.View)) {
      return new import_sql2.Param(value, column);
    }
    return value;
  }
  var eq = (left, right) => {
    return import_sql2.sql`${left} = ${bindIfParam(right, left)}`;
  };
  var ne = (left, right) => {
    return import_sql2.sql`${left} <> ${bindIfParam(right, left)}`;
  };
  function and(...unfilteredConditions) {
    const conditions = unfilteredConditions.filter((c) => c !== undefined);
    if (conditions.length === 0) {
      return;
    }
    if (conditions.length === 1) {
      return new import_sql2.SQL(conditions);
    }
    return new import_sql2.SQL([
      new import_sql2.StringChunk("("),
      import_sql2.sql.join(conditions, new import_sql2.StringChunk(" and ")),
      new import_sql2.StringChunk(")")
    ]);
  }
  function or(...unfilteredConditions) {
    const conditions = unfilteredConditions.filter((c) => c !== undefined);
    if (conditions.length === 0) {
      return;
    }
    if (conditions.length === 1) {
      return new import_sql2.SQL(conditions);
    }
    return new import_sql2.SQL([
      new import_sql2.StringChunk("("),
      import_sql2.sql.join(conditions, new import_sql2.StringChunk(" or ")),
      new import_sql2.StringChunk(")")
    ]);
  }
  function not(condition) {
    return import_sql2.sql`not ${condition}`;
  }
  var gt = (left, right) => {
    return import_sql2.sql`${left} > ${bindIfParam(right, left)}`;
  };
  var gte = (left, right) => {
    return import_sql2.sql`${left} >= ${bindIfParam(right, left)}`;
  };
  var lt = (left, right) => {
    return import_sql2.sql`${left} < ${bindIfParam(right, left)}`;
  };
  var lte = (left, right) => {
    return import_sql2.sql`${left} <= ${bindIfParam(right, left)}`;
  };
  function inArray(column, values) {
    if (Array.isArray(values)) {
      if (values.length === 0) {
        return import_sql2.sql`false`;
      }
      return import_sql2.sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
    }
    return import_sql2.sql`${column} in ${bindIfParam(values, column)}`;
  }
  function notInArray(column, values) {
    if (Array.isArray(values)) {
      if (values.length === 0) {
        return import_sql2.sql`true`;
      }
      return import_sql2.sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
    }
    return import_sql2.sql`${column} not in ${bindIfParam(values, column)}`;
  }
  function isNull(value) {
    return import_sql2.sql`${value} is null`;
  }
  function isNotNull(value) {
    return import_sql2.sql`${value} is not null`;
  }
  function exists(subquery) {
    return import_sql2.sql`exists ${subquery}`;
  }
  function notExists(subquery) {
    return import_sql2.sql`not exists ${subquery}`;
  }
  function between(column, min, max) {
    return import_sql2.sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
  }
  function notBetween(column, min, max) {
    return import_sql2.sql`${column} not between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
  }
  function like(column, value) {
    return import_sql2.sql`${column} like ${value}`;
  }
  function notLike(column, value) {
    return import_sql2.sql`${column} not like ${value}`;
  }
  function ilike(column, value) {
    return import_sql2.sql`${column} ilike ${value}`;
  }
  function notIlike(column, value) {
    return import_sql2.sql`${column} not ilike ${value}`;
  }
  function arrayContains(column, values) {
    if (Array.isArray(values)) {
      if (values.length === 0) {
        throw new Error("arrayContains requires at least one value");
      }
      const array = import_sql2.sql`${bindIfParam(values, column)}`;
      return import_sql2.sql`${column} @> ${array}`;
    }
    return import_sql2.sql`${column} @> ${bindIfParam(values, column)}`;
  }
  function arrayContained(column, values) {
    if (Array.isArray(values)) {
      if (values.length === 0) {
        throw new Error("arrayContained requires at least one value");
      }
      const array = import_sql2.sql`${bindIfParam(values, column)}`;
      return import_sql2.sql`${column} <@ ${array}`;
    }
    return import_sql2.sql`${column} <@ ${bindIfParam(values, column)}`;
  }
  function arrayOverlaps(column, values) {
    if (Array.isArray(values)) {
      if (values.length === 0) {
        throw new Error("arrayOverlaps requires at least one value");
      }
      const array = import_sql2.sql`${bindIfParam(values, column)}`;
      return import_sql2.sql`${column} && ${array}`;
    }
    return import_sql2.sql`${column} && ${bindIfParam(values, column)}`;
  }
});

// node_modules/drizzle-orm/sql/expressions/select.cjs
var require_select = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc2) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var select_exports = {};
  __export2(select_exports, {
    asc: () => asc,
    desc: () => desc
  });
  module.exports = __toCommonJS(select_exports);
  var import_sql2 = require_sql();
  function asc(column) {
    return import_sql2.sql`${column} asc`;
  }
  function desc(column) {
    return import_sql2.sql`${column} desc`;
  }
});

// node_modules/drizzle-orm/sql/expressions/index.cjs
var require_expressions = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var expressions_exports = {};
  module.exports = __toCommonJS(expressions_exports);
  __reExport(expressions_exports, require_conditions(), module.exports);
  __reExport(expressions_exports, require_select(), module.exports);
});

// node_modules/drizzle-orm/relations.cjs
var require_relations = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc2) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var relations_exports = {};
  __export2(relations_exports, {
    Many: () => Many,
    One: () => One,
    Relation: () => Relation,
    Relations: () => Relations,
    createMany: () => createMany,
    createOne: () => createOne,
    createTableRelationsHelpers: () => createTableRelationsHelpers,
    extractTablesRelationalConfig: () => extractTablesRelationalConfig,
    getOperators: () => getOperators,
    getOrderByOperators: () => getOrderByOperators,
    mapRelationalRow: () => mapRelationalRow,
    normalizeRelation: () => normalizeRelation,
    relations: () => relations
  });
  module.exports = __toCommonJS(relations_exports);
  var import_table3 = require_table();
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_primary_keys = require_primary_keys();
  var import_expressions = require_expressions();
  var import_sql2 = require_sql();

  class Relation {
    constructor(sourceTable, referencedTable, relationName) {
      this.sourceTable = sourceTable;
      this.referencedTable = referencedTable;
      this.relationName = relationName;
      this.referencedTableName = referencedTable[import_table3.Table.Symbol.Name];
    }
    static [import_entity18.entityKind] = "Relation";
    referencedTableName;
    fieldName;
  }

  class Relations {
    constructor(table, config) {
      this.table = table;
      this.config = config;
    }
    static [import_entity18.entityKind] = "Relations";
  }

  class One extends Relation {
    constructor(sourceTable, referencedTable, config, isNullable) {
      super(sourceTable, referencedTable, config?.relationName);
      this.config = config;
      this.isNullable = isNullable;
    }
    static [import_entity18.entityKind] = "One";
    withFieldName(fieldName) {
      const relation = new One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
      relation.fieldName = fieldName;
      return relation;
    }
  }

  class Many extends Relation {
    constructor(sourceTable, referencedTable, config) {
      super(sourceTable, referencedTable, config?.relationName);
      this.config = config;
    }
    static [import_entity18.entityKind] = "Many";
    withFieldName(fieldName) {
      const relation = new Many(this.sourceTable, this.referencedTable, this.config);
      relation.fieldName = fieldName;
      return relation;
    }
  }
  function getOperators() {
    return {
      and: import_expressions.and,
      between: import_expressions.between,
      eq: import_expressions.eq,
      exists: import_expressions.exists,
      gt: import_expressions.gt,
      gte: import_expressions.gte,
      ilike: import_expressions.ilike,
      inArray: import_expressions.inArray,
      isNull: import_expressions.isNull,
      isNotNull: import_expressions.isNotNull,
      like: import_expressions.like,
      lt: import_expressions.lt,
      lte: import_expressions.lte,
      ne: import_expressions.ne,
      not: import_expressions.not,
      notBetween: import_expressions.notBetween,
      notExists: import_expressions.notExists,
      notLike: import_expressions.notLike,
      notIlike: import_expressions.notIlike,
      notInArray: import_expressions.notInArray,
      or: import_expressions.or,
      sql: import_sql2.sql
    };
  }
  function getOrderByOperators() {
    return {
      sql: import_sql2.sql,
      asc: import_expressions.asc,
      desc: import_expressions.desc
    };
  }
  function extractTablesRelationalConfig(schema, configHelpers) {
    if (Object.keys(schema).length === 1 && "default" in schema && !(0, import_entity18.is)(schema["default"], import_table3.Table)) {
      schema = schema["default"];
    }
    const tableNamesMap = {};
    const relationsBuffer = {};
    const tablesConfig = {};
    for (const [key, value] of Object.entries(schema)) {
      if ((0, import_entity18.is)(value, import_table3.Table)) {
        const dbName = (0, import_table3.getTableUniqueName)(value);
        const bufferedRelations = relationsBuffer[dbName];
        tableNamesMap[dbName] = key;
        tablesConfig[key] = {
          tsName: key,
          dbName: value[import_table3.Table.Symbol.Name],
          schema: value[import_table3.Table.Symbol.Schema],
          columns: value[import_table3.Table.Symbol.Columns],
          relations: bufferedRelations?.relations ?? {},
          primaryKey: bufferedRelations?.primaryKey ?? []
        };
        for (const column of Object.values(value[import_table3.Table.Symbol.Columns])) {
          if (column.primary) {
            tablesConfig[key].primaryKey.push(column);
          }
        }
        const extraConfig = value[import_table3.Table.Symbol.ExtraConfigBuilder]?.(value[import_table3.Table.Symbol.ExtraConfigColumns]);
        if (extraConfig) {
          for (const configEntry of Object.values(extraConfig)) {
            if ((0, import_entity18.is)(configEntry, import_primary_keys.PrimaryKeyBuilder)) {
              tablesConfig[key].primaryKey.push(...configEntry.columns);
            }
          }
        }
      } else if ((0, import_entity18.is)(value, Relations)) {
        const dbName = (0, import_table3.getTableUniqueName)(value.table);
        const tableName = tableNamesMap[dbName];
        const relations2 = value.config(configHelpers(value.table));
        let primaryKey;
        for (const [relationName, relation] of Object.entries(relations2)) {
          if (tableName) {
            const tableConfig = tablesConfig[tableName];
            tableConfig.relations[relationName] = relation;
            if (primaryKey) {
              tableConfig.primaryKey.push(...primaryKey);
            }
          } else {
            if (!(dbName in relationsBuffer)) {
              relationsBuffer[dbName] = {
                relations: {},
                primaryKey
              };
            }
            relationsBuffer[dbName].relations[relationName] = relation;
          }
        }
      }
    }
    return { tables: tablesConfig, tableNamesMap };
  }
  function relations(table, relations2) {
    return new Relations(table, (helpers) => Object.fromEntries(Object.entries(relations2(helpers)).map(([key, value]) => [
      key,
      value.withFieldName(key)
    ])));
  }
  function createOne(sourceTable) {
    return function one(table, config) {
      return new One(sourceTable, table, config, config?.fields.reduce((res, f) => res && f.notNull, true) ?? false);
    };
  }
  function createMany(sourceTable) {
    return function many(referencedTable, config) {
      return new Many(sourceTable, referencedTable, config);
    };
  }
  function normalizeRelation(schema, tableNamesMap, relation) {
    if ((0, import_entity18.is)(relation, One) && relation.config) {
      return {
        fields: relation.config.fields,
        references: relation.config.references
      };
    }
    const referencedTableTsName = tableNamesMap[(0, import_table3.getTableUniqueName)(relation.referencedTable)];
    if (!referencedTableTsName) {
      throw new Error(`Table "${relation.referencedTable[import_table3.Table.Symbol.Name]}" not found in schema`);
    }
    const referencedTableConfig = schema[referencedTableTsName];
    if (!referencedTableConfig) {
      throw new Error(`Table "${referencedTableTsName}" not found in schema`);
    }
    const sourceTable = relation.sourceTable;
    const sourceTableTsName = tableNamesMap[(0, import_table3.getTableUniqueName)(sourceTable)];
    if (!sourceTableTsName) {
      throw new Error(`Table "${sourceTable[import_table3.Table.Symbol.Name]}" not found in schema`);
    }
    const reverseRelations = [];
    for (const referencedTableRelation of Object.values(referencedTableConfig.relations)) {
      if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
        reverseRelations.push(referencedTableRelation);
      }
    }
    if (reverseRelations.length > 1) {
      throw relation.relationName ? new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[import_table3.Table.Symbol.Name]}". Please specify relation name`);
    }
    if (reverseRelations[0] && (0, import_entity18.is)(reverseRelations[0], One) && reverseRelations[0].config) {
      return {
        fields: reverseRelations[0].config.references,
        references: reverseRelations[0].config.fields
      };
    }
    throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
  }
  function createTableRelationsHelpers(sourceTable) {
    return {
      one: createOne(sourceTable),
      many: createMany(sourceTable)
    };
  }
  function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
    const result = {};
    for (const [
      selectionItemIndex,
      selectionItem
    ] of buildQueryResultSelection.entries()) {
      if (selectionItem.isJson) {
        const relation = tableConfig.relations[selectionItem.tsKey];
        const rawSubRows = row[selectionItemIndex];
        const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
        result[selectionItem.tsKey] = (0, import_entity18.is)(relation, One) ? subRows && mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRows, selectionItem.selection, mapColumnValue) : subRows.map((subRow) => mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRow, selectionItem.selection, mapColumnValue));
      } else {
        const value = mapColumnValue(row[selectionItemIndex]);
        const field = selectionItem.field;
        let decoder;
        if ((0, import_entity18.is)(field, import_column4.Column)) {
          decoder = field;
        } else if ((0, import_entity18.is)(field, import_sql2.SQL)) {
          decoder = field.decoder;
        } else {
          decoder = field.sql.decoder;
        }
        result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
      }
    }
    return result;
  }
});

// node_modules/drizzle-orm/alias.cjs
var require_alias = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var alias_exports = {};
  __export2(alias_exports, {
    ColumnAliasProxyHandler: () => ColumnAliasProxyHandler,
    RelationTableAliasProxyHandler: () => RelationTableAliasProxyHandler,
    TableAliasProxyHandler: () => TableAliasProxyHandler,
    aliasedRelation: () => aliasedRelation,
    aliasedTable: () => aliasedTable,
    aliasedTableColumn: () => aliasedTableColumn,
    mapColumnsInAliasedSQLToAlias: () => mapColumnsInAliasedSQLToAlias,
    mapColumnsInSQLToAlias: () => mapColumnsInSQLToAlias
  });
  module.exports = __toCommonJS(alias_exports);
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  var import_table3 = require_table();
  var import_view_common2 = require_view_common();

  class ColumnAliasProxyHandler {
    constructor(table) {
      this.table = table;
    }
    static [import_entity18.entityKind] = "ColumnAliasProxyHandler";
    get(columnObj, prop) {
      if (prop === "table") {
        return this.table;
      }
      return columnObj[prop];
    }
  }

  class TableAliasProxyHandler {
    constructor(alias, replaceOriginalName) {
      this.alias = alias;
      this.replaceOriginalName = replaceOriginalName;
    }
    static [import_entity18.entityKind] = "TableAliasProxyHandler";
    get(target, prop) {
      if (prop === import_table3.Table.Symbol.IsAlias) {
        return true;
      }
      if (prop === import_table3.Table.Symbol.Name) {
        return this.alias;
      }
      if (this.replaceOriginalName && prop === import_table3.Table.Symbol.OriginalName) {
        return this.alias;
      }
      if (prop === import_view_common2.ViewBaseConfig) {
        return {
          ...target[import_view_common2.ViewBaseConfig],
          name: this.alias,
          isAlias: true
        };
      }
      if (prop === import_table3.Table.Symbol.Columns) {
        const columns = target[import_table3.Table.Symbol.Columns];
        if (!columns) {
          return columns;
        }
        const proxiedColumns = {};
        Object.keys(columns).map((key) => {
          proxiedColumns[key] = new Proxy(columns[key], new ColumnAliasProxyHandler(new Proxy(target, this)));
        });
        return proxiedColumns;
      }
      const value = target[prop];
      if ((0, import_entity18.is)(value, import_column4.Column)) {
        return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
      }
      return value;
    }
  }

  class RelationTableAliasProxyHandler {
    constructor(alias) {
      this.alias = alias;
    }
    static [import_entity18.entityKind] = "RelationTableAliasProxyHandler";
    get(target, prop) {
      if (prop === "sourceTable") {
        return aliasedTable(target.sourceTable, this.alias);
      }
      return target[prop];
    }
  }
  function aliasedTable(table, tableAlias) {
    return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
  }
  function aliasedRelation(relation, tableAlias) {
    return new Proxy(relation, new RelationTableAliasProxyHandler(tableAlias));
  }
  function aliasedTableColumn(column, tableAlias) {
    return new Proxy(column, new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false))));
  }
  function mapColumnsInAliasedSQLToAlias(query, alias) {
    return new import_sql2.SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
  }
  function mapColumnsInSQLToAlias(query, alias) {
    return import_sql2.sql.join(query.queryChunks.map((c) => {
      if ((0, import_entity18.is)(c, import_column4.Column)) {
        return aliasedTableColumn(c, alias);
      }
      if ((0, import_entity18.is)(c, import_sql2.SQL)) {
        return mapColumnsInSQLToAlias(c, alias);
      }
      if ((0, import_entity18.is)(c, import_sql2.SQL.Aliased)) {
        return mapColumnsInAliasedSQLToAlias(c, alias);
      }
      return c;
    }));
  }
});

// node_modules/drizzle-orm/selection-proxy.cjs
var require_selection_proxy = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var selection_proxy_exports = {};
  __export2(selection_proxy_exports, {
    SelectionProxyHandler: () => SelectionProxyHandler
  });
  module.exports = __toCommonJS(selection_proxy_exports);
  var import_alias = require_alias();
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  var import_subquery2 = require_subquery();
  var import_view_common2 = require_view_common();

  class SelectionProxyHandler {
    static [import_entity18.entityKind] = "SelectionProxyHandler";
    config;
    constructor(config) {
      this.config = { ...config };
    }
    get(subquery, prop) {
      if (prop === "_") {
        return {
          ...subquery["_"],
          selectedFields: new Proxy(subquery._.selectedFields, this)
        };
      }
      if (prop === import_view_common2.ViewBaseConfig) {
        return {
          ...subquery[import_view_common2.ViewBaseConfig],
          selectedFields: new Proxy(subquery[import_view_common2.ViewBaseConfig].selectedFields, this)
        };
      }
      if (typeof prop === "symbol") {
        return subquery[prop];
      }
      const columns = (0, import_entity18.is)(subquery, import_subquery2.Subquery) ? subquery._.selectedFields : (0, import_entity18.is)(subquery, import_sql2.View) ? subquery[import_view_common2.ViewBaseConfig].selectedFields : subquery;
      const value = columns[prop];
      if ((0, import_entity18.is)(value, import_sql2.SQL.Aliased)) {
        if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
          return value.sql;
        }
        const newValue = value.clone();
        newValue.isSelectionField = true;
        return newValue;
      }
      if ((0, import_entity18.is)(value, import_sql2.SQL)) {
        if (this.config.sqlBehavior === "sql") {
          return value;
        }
        throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
      }
      if ((0, import_entity18.is)(value, import_column4.Column)) {
        if (this.config.alias) {
          return new Proxy(value, new import_alias.ColumnAliasProxyHandler(new Proxy(value.table, new import_alias.TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false))));
        }
        return value;
      }
      if (typeof value !== "object" || value === null) {
        return value;
      }
      return new Proxy(value, new SelectionProxyHandler(this.config));
    }
  }
});

// node_modules/drizzle-orm/query-promise.cjs
var require_query_promise = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var query_promise_exports = {};
  __export2(query_promise_exports, {
    QueryPromise: () => QueryPromise
  });
  module.exports = __toCommonJS(query_promise_exports);
  var import_entity18 = require_entity();

  class QueryPromise {
    static [import_entity18.entityKind] = "QueryPromise";
    [Symbol.toStringTag] = "QueryPromise";
    catch(onRejected) {
      return this.then(undefined, onRejected);
    }
    finally(onFinally) {
      return this.then((value) => {
        onFinally?.();
        return value;
      }, (reason) => {
        onFinally?.();
        throw reason;
      });
    }
    then(onFulfilled, onRejected) {
      return this.execute().then(onFulfilled, onRejected);
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/foreign-keys.cjs
var require_foreign_keys2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var foreign_keys_exports = {};
  __export2(foreign_keys_exports, {
    ForeignKey: () => ForeignKey2,
    ForeignKeyBuilder: () => ForeignKeyBuilder2,
    foreignKey: () => foreignKey
  });
  module.exports = __toCommonJS(foreign_keys_exports);
  var import_entity18 = require_entity();
  var import_table_utils5 = require_table_utils();

  class ForeignKeyBuilder2 {
    static [import_entity18.entityKind] = "SQLiteForeignKeyBuilder";
    reference;
    _onUpdate;
    _onDelete;
    constructor(config, actions) {
      this.reference = () => {
        const { name, columns, foreignColumns } = config();
        return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
      };
      if (actions) {
        this._onUpdate = actions.onUpdate;
        this._onDelete = actions.onDelete;
      }
    }
    onUpdate(action) {
      this._onUpdate = action;
      return this;
    }
    onDelete(action) {
      this._onDelete = action;
      return this;
    }
    build(table) {
      return new ForeignKey2(table, this);
    }
  }

  class ForeignKey2 {
    constructor(table, builder) {
      this.table = table;
      this.reference = builder.reference;
      this.onUpdate = builder._onUpdate;
      this.onDelete = builder._onDelete;
    }
    static [import_entity18.entityKind] = "SQLiteForeignKey";
    reference;
    onUpdate;
    onDelete;
    getName() {
      const { name, columns, foreignColumns } = this.reference();
      const columnNames = columns.map((column) => column.name);
      const foreignColumnNames = foreignColumns.map((column) => column.name);
      const chunks = [
        this.table[import_table_utils5.TableName],
        ...columnNames,
        foreignColumns[0].table[import_table_utils5.TableName],
        ...foreignColumnNames
      ];
      return name ?? `${chunks.join("_")}_fk`;
    }
  }
  function foreignKey(config) {
    function mappedConfig() {
      if (typeof config === "function") {
        const { name, columns, foreignColumns } = config();
        return {
          name,
          columns,
          foreignColumns
        };
      }
      return config;
    }
    return new ForeignKeyBuilder2(mappedConfig);
  }
});

// node_modules/drizzle-orm/sqlite-core/unique-constraint.cjs
var require_unique_constraint2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var unique_constraint_exports = {};
  __export2(unique_constraint_exports, {
    UniqueConstraint: () => UniqueConstraint2,
    UniqueConstraintBuilder: () => UniqueConstraintBuilder2,
    UniqueOnConstraintBuilder: () => UniqueOnConstraintBuilder2,
    unique: () => unique2,
    uniqueKeyName: () => uniqueKeyName3
  });
  module.exports = __toCommonJS(unique_constraint_exports);
  var import_entity18 = require_entity();
  var import_table_utils5 = require_table_utils();
  function uniqueKeyName3(table, columns) {
    return `${table[import_table_utils5.TableName]}_${columns.join("_")}_unique`;
  }
  function unique2(name) {
    return new UniqueOnConstraintBuilder2(name);
  }

  class UniqueConstraintBuilder2 {
    constructor(columns, name) {
      this.name = name;
      this.columns = columns;
    }
    static [import_entity18.entityKind] = "SQLiteUniqueConstraintBuilder";
    columns;
    build(table) {
      return new UniqueConstraint2(table, this.columns, this.name);
    }
  }

  class UniqueOnConstraintBuilder2 {
    static [import_entity18.entityKind] = "SQLiteUniqueOnConstraintBuilder";
    name;
    constructor(name) {
      this.name = name;
    }
    on(...columns) {
      return new UniqueConstraintBuilder2(columns, this.name);
    }
  }

  class UniqueConstraint2 {
    constructor(table, columns, name) {
      this.table = table;
      this.columns = columns;
      this.name = name ?? uniqueKeyName3(this.table, this.columns.map((column) => column.name));
    }
    static [import_entity18.entityKind] = "SQLiteUniqueConstraint";
    columns;
    name;
    getName() {
      return this.name;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/common.cjs
var require_common2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var common_exports = {};
  __export2(common_exports, {
    SQLiteColumn: () => SQLiteColumn2,
    SQLiteColumnBuilder: () => SQLiteColumnBuilder2
  });
  module.exports = __toCommonJS(common_exports);
  var import_column_builder2 = require_column_builder();
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_foreign_keys2 = require_foreign_keys2();
  var import_unique_constraint3 = require_unique_constraint2();

  class SQLiteColumnBuilder2 extends import_column_builder2.ColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteColumnBuilder";
    foreignKeyConfigs = [];
    references(ref, actions = {}) {
      this.foreignKeyConfigs.push({ ref, actions });
      return this;
    }
    unique(name) {
      this.config.isUnique = true;
      this.config.uniqueName = name;
      return this;
    }
    generatedAlwaysAs(as, config) {
      this.config.generated = {
        as,
        type: "always",
        mode: config?.mode ?? "virtual"
      };
      return this;
    }
    buildForeignKeys(column, table) {
      return this.foreignKeyConfigs.map(({ ref, actions }) => {
        return ((ref2, actions2) => {
          const builder = new import_foreign_keys2.ForeignKeyBuilder(() => {
            const foreignColumn = ref2();
            return { columns: [column], foreignColumns: [foreignColumn] };
          });
          if (actions2.onUpdate) {
            builder.onUpdate(actions2.onUpdate);
          }
          if (actions2.onDelete) {
            builder.onDelete(actions2.onDelete);
          }
          return builder.build(table);
        })(ref, actions);
      });
    }
  }

  class SQLiteColumn2 extends import_column4.Column {
    constructor(table, config) {
      if (!config.uniqueName) {
        config.uniqueName = (0, import_unique_constraint3.uniqueKeyName)(table, [config.name]);
      }
      super(table, config);
      this.table = table;
    }
    static [import_entity18.entityKind] = "SQLiteColumn";
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/blob.cjs
var require_blob = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var blob_exports = {};
  __export2(blob_exports, {
    SQLiteBigInt: () => SQLiteBigInt2,
    SQLiteBigIntBuilder: () => SQLiteBigIntBuilder2,
    SQLiteBlobBuffer: () => SQLiteBlobBuffer2,
    SQLiteBlobBufferBuilder: () => SQLiteBlobBufferBuilder2,
    SQLiteBlobJson: () => SQLiteBlobJson2,
    SQLiteBlobJsonBuilder: () => SQLiteBlobJsonBuilder2,
    blob: () => blob2
  });
  module.exports = __toCommonJS(blob_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common2();

  class SQLiteBigIntBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteBigIntBuilder";
    constructor(name) {
      super(name, "bigint", "SQLiteBigInt");
    }
    build(table) {
      return new SQLiteBigInt2(table, this.config);
    }
  }

  class SQLiteBigInt2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteBigInt";
    getSQLType() {
      return "blob";
    }
    mapFromDriverValue(value) {
      if (typeof Buffer !== "undefined" && Buffer.from) {
        const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
        return BigInt(buf.toString("utf8"));
      }
      return BigInt(import_utils6.textDecoder.decode(value));
    }
    mapToDriverValue(value) {
      return Buffer.from(value.toString());
    }
  }

  class SQLiteBlobJsonBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteBlobJsonBuilder";
    constructor(name) {
      super(name, "json", "SQLiteBlobJson");
    }
    build(table) {
      return new SQLiteBlobJson2(table, this.config);
    }
  }

  class SQLiteBlobJson2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteBlobJson";
    getSQLType() {
      return "blob";
    }
    mapFromDriverValue(value) {
      if (typeof Buffer !== "undefined" && Buffer.from) {
        const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
        return JSON.parse(buf.toString("utf8"));
      }
      return JSON.parse(import_utils6.textDecoder.decode(value));
    }
    mapToDriverValue(value) {
      return Buffer.from(JSON.stringify(value));
    }
  }

  class SQLiteBlobBufferBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteBlobBufferBuilder";
    constructor(name) {
      super(name, "buffer", "SQLiteBlobBuffer");
    }
    build(table) {
      return new SQLiteBlobBuffer2(table, this.config);
    }
  }

  class SQLiteBlobBuffer2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteBlobBuffer";
    mapFromDriverValue(value) {
      if (Buffer.isBuffer(value)) {
        return value;
      }
      return Buffer.from(value);
    }
    getSQLType() {
      return "blob";
    }
  }
  function blob2(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (config?.mode === "json") {
      return new SQLiteBlobJsonBuilder2(name);
    }
    if (config?.mode === "bigint") {
      return new SQLiteBigIntBuilder2(name);
    }
    return new SQLiteBlobBufferBuilder2(name);
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/custom.cjs
var require_custom2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var custom_exports = {};
  __export2(custom_exports, {
    SQLiteCustomColumn: () => SQLiteCustomColumn2,
    SQLiteCustomColumnBuilder: () => SQLiteCustomColumnBuilder2,
    customType: () => customType2
  });
  module.exports = __toCommonJS(custom_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common2();

  class SQLiteCustomColumnBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteCustomColumnBuilder";
    constructor(name, fieldConfig, customTypeParams) {
      super(name, "custom", "SQLiteCustomColumn");
      this.config.fieldConfig = fieldConfig;
      this.config.customTypeParams = customTypeParams;
    }
    build(table) {
      return new SQLiteCustomColumn2(table, this.config);
    }
  }

  class SQLiteCustomColumn2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteCustomColumn";
    sqlName;
    mapTo;
    mapFrom;
    constructor(table, config) {
      super(table, config);
      this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
      this.mapTo = config.customTypeParams.toDriver;
      this.mapFrom = config.customTypeParams.fromDriver;
    }
    getSQLType() {
      return this.sqlName;
    }
    mapFromDriverValue(value) {
      return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
    }
    mapToDriverValue(value) {
      return typeof this.mapTo === "function" ? this.mapTo(value) : value;
    }
  }
  function customType2(customTypeParams) {
    return (a, b) => {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new SQLiteCustomColumnBuilder2(name, config, customTypeParams);
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/integer.cjs
var require_integer2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var integer_exports = {};
  __export2(integer_exports, {
    SQLiteBaseInteger: () => SQLiteBaseInteger2,
    SQLiteBaseIntegerBuilder: () => SQLiteBaseIntegerBuilder2,
    SQLiteBoolean: () => SQLiteBoolean2,
    SQLiteBooleanBuilder: () => SQLiteBooleanBuilder2,
    SQLiteInteger: () => SQLiteInteger2,
    SQLiteIntegerBuilder: () => SQLiteIntegerBuilder2,
    SQLiteTimestamp: () => SQLiteTimestamp2,
    SQLiteTimestampBuilder: () => SQLiteTimestampBuilder2,
    int: () => int,
    integer: () => integer2
  });
  module.exports = __toCommonJS(integer_exports);
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  var import_utils6 = require_utils();
  var import_common8 = require_common2();

  class SQLiteBaseIntegerBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteBaseIntegerBuilder";
    constructor(name, dataType, columnType) {
      super(name, dataType, columnType);
      this.config.autoIncrement = false;
    }
    primaryKey(config) {
      if (config?.autoIncrement) {
        this.config.autoIncrement = true;
      }
      this.config.hasDefault = true;
      return super.primaryKey();
    }
  }

  class SQLiteBaseInteger2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteBaseInteger";
    autoIncrement = this.config.autoIncrement;
    getSQLType() {
      return "integer";
    }
  }

  class SQLiteIntegerBuilder2 extends SQLiteBaseIntegerBuilder2 {
    static [import_entity18.entityKind] = "SQLiteIntegerBuilder";
    constructor(name) {
      super(name, "number", "SQLiteInteger");
    }
    build(table) {
      return new SQLiteInteger2(table, this.config);
    }
  }

  class SQLiteInteger2 extends SQLiteBaseInteger2 {
    static [import_entity18.entityKind] = "SQLiteInteger";
  }

  class SQLiteTimestampBuilder2 extends SQLiteBaseIntegerBuilder2 {
    static [import_entity18.entityKind] = "SQLiteTimestampBuilder";
    constructor(name, mode) {
      super(name, "date", "SQLiteTimestamp");
      this.config.mode = mode;
    }
    defaultNow() {
      return this.default(import_sql2.sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
    }
    build(table) {
      return new SQLiteTimestamp2(table, this.config);
    }
  }

  class SQLiteTimestamp2 extends SQLiteBaseInteger2 {
    static [import_entity18.entityKind] = "SQLiteTimestamp";
    mode = this.config.mode;
    mapFromDriverValue(value) {
      if (this.config.mode === "timestamp") {
        return new Date(value * 1000);
      }
      return new Date(value);
    }
    mapToDriverValue(value) {
      const unix = value.getTime();
      if (this.config.mode === "timestamp") {
        return Math.floor(unix / 1000);
      }
      return unix;
    }
  }

  class SQLiteBooleanBuilder2 extends SQLiteBaseIntegerBuilder2 {
    static [import_entity18.entityKind] = "SQLiteBooleanBuilder";
    constructor(name, mode) {
      super(name, "boolean", "SQLiteBoolean");
      this.config.mode = mode;
    }
    build(table) {
      return new SQLiteBoolean2(table, this.config);
    }
  }

  class SQLiteBoolean2 extends SQLiteBaseInteger2 {
    static [import_entity18.entityKind] = "SQLiteBoolean";
    mode = this.config.mode;
    mapFromDriverValue(value) {
      return Number(value) === 1;
    }
    mapToDriverValue(value) {
      return value ? 1 : 0;
    }
  }
  function integer2(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
      return new SQLiteTimestampBuilder2(name, config.mode);
    }
    if (config?.mode === "boolean") {
      return new SQLiteBooleanBuilder2(name, config.mode);
    }
    return new SQLiteIntegerBuilder2(name);
  }
  var int = integer2;
});

// node_modules/drizzle-orm/sqlite-core/columns/numeric.cjs
var require_numeric2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var numeric_exports = {};
  __export2(numeric_exports, {
    SQLiteNumeric: () => SQLiteNumeric2,
    SQLiteNumericBigInt: () => SQLiteNumericBigInt2,
    SQLiteNumericBigIntBuilder: () => SQLiteNumericBigIntBuilder2,
    SQLiteNumericBuilder: () => SQLiteNumericBuilder2,
    SQLiteNumericNumber: () => SQLiteNumericNumber2,
    SQLiteNumericNumberBuilder: () => SQLiteNumericNumberBuilder2,
    numeric: () => numeric2
  });
  module.exports = __toCommonJS(numeric_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common2();

  class SQLiteNumericBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteNumericBuilder";
    constructor(name) {
      super(name, "string", "SQLiteNumeric");
    }
    build(table) {
      return new SQLiteNumeric2(table, this.config);
    }
  }

  class SQLiteNumeric2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteNumeric";
    mapFromDriverValue(value) {
      if (typeof value === "string")
        return value;
      return String(value);
    }
    getSQLType() {
      return "numeric";
    }
  }

  class SQLiteNumericNumberBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteNumericNumberBuilder";
    constructor(name) {
      super(name, "number", "SQLiteNumericNumber");
    }
    build(table) {
      return new SQLiteNumericNumber2(table, this.config);
    }
  }

  class SQLiteNumericNumber2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteNumericNumber";
    mapFromDriverValue(value) {
      if (typeof value === "number")
        return value;
      return Number(value);
    }
    mapToDriverValue = String;
    getSQLType() {
      return "numeric";
    }
  }

  class SQLiteNumericBigIntBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteNumericBigIntBuilder";
    constructor(name) {
      super(name, "bigint", "SQLiteNumericBigInt");
    }
    build(table) {
      return new SQLiteNumericBigInt2(table, this.config);
    }
  }

  class SQLiteNumericBigInt2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteNumericBigInt";
    mapFromDriverValue = BigInt;
    mapToDriverValue = String;
    getSQLType() {
      return "numeric";
    }
  }
  function numeric2(a, b) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    const mode = config?.mode;
    return mode === "number" ? new SQLiteNumericNumberBuilder2(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder2(name) : new SQLiteNumericBuilder2(name);
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/real.cjs
var require_real2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var real_exports = {};
  __export2(real_exports, {
    SQLiteReal: () => SQLiteReal2,
    SQLiteRealBuilder: () => SQLiteRealBuilder2,
    real: () => real2
  });
  module.exports = __toCommonJS(real_exports);
  var import_entity18 = require_entity();
  var import_common8 = require_common2();

  class SQLiteRealBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteRealBuilder";
    constructor(name) {
      super(name, "number", "SQLiteReal");
    }
    build(table) {
      return new SQLiteReal2(table, this.config);
    }
  }

  class SQLiteReal2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteReal";
    getSQLType() {
      return "real";
    }
  }
  function real2(name) {
    return new SQLiteRealBuilder2(name ?? "");
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/text.cjs
var require_text2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var text_exports = {};
  __export2(text_exports, {
    SQLiteText: () => SQLiteText2,
    SQLiteTextBuilder: () => SQLiteTextBuilder2,
    SQLiteTextJson: () => SQLiteTextJson2,
    SQLiteTextJsonBuilder: () => SQLiteTextJsonBuilder2,
    text: () => text2
  });
  module.exports = __toCommonJS(text_exports);
  var import_entity18 = require_entity();
  var import_utils6 = require_utils();
  var import_common8 = require_common2();

  class SQLiteTextBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteTextBuilder";
    constructor(name, config) {
      super(name, "string", "SQLiteText");
      this.config.enumValues = config.enum;
      this.config.length = config.length;
    }
    build(table) {
      return new SQLiteText2(table, this.config);
    }
  }

  class SQLiteText2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteText";
    enumValues = this.config.enumValues;
    length = this.config.length;
    constructor(table, config) {
      super(table, config);
    }
    getSQLType() {
      return `text${this.config.length ? `(${this.config.length})` : ""}`;
    }
  }

  class SQLiteTextJsonBuilder2 extends import_common8.SQLiteColumnBuilder {
    static [import_entity18.entityKind] = "SQLiteTextJsonBuilder";
    constructor(name) {
      super(name, "json", "SQLiteTextJson");
    }
    build(table) {
      return new SQLiteTextJson2(table, this.config);
    }
  }

  class SQLiteTextJson2 extends import_common8.SQLiteColumn {
    static [import_entity18.entityKind] = "SQLiteTextJson";
    getSQLType() {
      return "text";
    }
    mapFromDriverValue(value) {
      return JSON.parse(value);
    }
    mapToDriverValue(value) {
      return JSON.stringify(value);
    }
  }
  function text2(a, b = {}) {
    const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
    if (config.mode === "json") {
      return new SQLiteTextJsonBuilder2(name);
    }
    return new SQLiteTextBuilder2(name, config);
  }
});

// node_modules/drizzle-orm/sqlite-core/columns/all.cjs
var require_all2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var all_exports = {};
  __export2(all_exports, {
    getSQLiteColumnBuilders: () => getSQLiteColumnBuilders2
  });
  module.exports = __toCommonJS(all_exports);
  var import_blob2 = require_blob();
  var import_custom2 = require_custom2();
  var import_integer2 = require_integer2();
  var import_numeric2 = require_numeric2();
  var import_real2 = require_real2();
  var import_text2 = require_text2();
  function getSQLiteColumnBuilders2() {
    return {
      blob: import_blob2.blob,
      customType: import_custom2.customType,
      integer: import_integer2.integer,
      numeric: import_numeric2.numeric,
      real: import_real2.real,
      text: import_text2.text
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/table.cjs
var require_table3 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var table_exports = {};
  __export2(table_exports, {
    InlineForeignKeys: () => InlineForeignKeys2,
    SQLiteTable: () => SQLiteTable2,
    sqliteTable: () => sqliteTable2,
    sqliteTableCreator: () => sqliteTableCreator
  });
  module.exports = __toCommonJS(table_exports);
  var import_entity18 = require_entity();
  var import_table3 = require_table();
  var import_all2 = require_all2();
  var InlineForeignKeys2 = Symbol.for("drizzle:SQLiteInlineForeignKeys");

  class SQLiteTable2 extends import_table3.Table {
    static [import_entity18.entityKind] = "SQLiteTable";
    static Symbol = Object.assign({}, import_table3.Table.Symbol, {
      InlineForeignKeys: InlineForeignKeys2
    });
    [import_table3.Table.Symbol.Columns];
    [InlineForeignKeys2] = [];
    [import_table3.Table.Symbol.ExtraConfigBuilder] = undefined;
  }
  function sqliteTableBase2(name, columns, extraConfig, schema, baseName = name) {
    const rawTable = new SQLiteTable2(name, schema, baseName);
    const parsedColumns = typeof columns === "function" ? columns((0, import_all2.getSQLiteColumnBuilders)()) : columns;
    const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    }));
    const table = Object.assign(rawTable, builtColumns);
    table[import_table3.Table.Symbol.Columns] = builtColumns;
    table[import_table3.Table.Symbol.ExtraConfigColumns] = builtColumns;
    if (extraConfig) {
      table[SQLiteTable2.Symbol.ExtraConfigBuilder] = extraConfig;
    }
    return table;
  }
  var sqliteTable2 = (name, columns, extraConfig) => {
    return sqliteTableBase2(name, columns, extraConfig);
  };
  function sqliteTableCreator(customizeTableName) {
    return (name, columns, extraConfig) => {
      return sqliteTableBase2(customizeTableName(name), columns, extraConfig, undefined, name);
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/checks.cjs
var require_checks = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var checks_exports = {};
  __export2(checks_exports, {
    Check: () => Check,
    CheckBuilder: () => CheckBuilder,
    check: () => check
  });
  module.exports = __toCommonJS(checks_exports);
  var import_entity18 = require_entity();

  class CheckBuilder {
    constructor(name, value) {
      this.name = name;
      this.value = value;
    }
    static [import_entity18.entityKind] = "SQLiteCheckBuilder";
    brand;
    build(table) {
      return new Check(table, this);
    }
  }

  class Check {
    constructor(table, builder) {
      this.table = table;
      this.name = builder.name;
      this.value = builder.value;
    }
    static [import_entity18.entityKind] = "SQLiteCheck";
    name;
    value;
  }
  function check(name, value) {
    return new CheckBuilder(name, value);
  }
});

// node_modules/drizzle-orm/sqlite-core/indexes.cjs
var require_indexes = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var indexes_exports = {};
  __export2(indexes_exports, {
    Index: () => Index,
    IndexBuilder: () => IndexBuilder,
    IndexBuilderOn: () => IndexBuilderOn,
    index: () => index,
    uniqueIndex: () => uniqueIndex
  });
  module.exports = __toCommonJS(indexes_exports);
  var import_entity18 = require_entity();

  class IndexBuilderOn {
    constructor(name, unique2) {
      this.name = name;
      this.unique = unique2;
    }
    static [import_entity18.entityKind] = "SQLiteIndexBuilderOn";
    on(...columns) {
      return new IndexBuilder(this.name, columns, this.unique);
    }
  }

  class IndexBuilder {
    static [import_entity18.entityKind] = "SQLiteIndexBuilder";
    config;
    constructor(name, columns, unique2) {
      this.config = {
        name,
        columns,
        unique: unique2,
        where: undefined
      };
    }
    where(condition) {
      this.config.where = condition;
      return this;
    }
    build(table) {
      return new Index(this.config, table);
    }
  }

  class Index {
    static [import_entity18.entityKind] = "SQLiteIndex";
    config;
    constructor(config, table) {
      this.config = { ...config, table };
    }
  }
  function index(name) {
    return new IndexBuilderOn(name, false);
  }
  function uniqueIndex(name) {
    return new IndexBuilderOn(name, true);
  }
});

// node_modules/drizzle-orm/sqlite-core/primary-keys.cjs
var require_primary_keys2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var primary_keys_exports = {};
  __export2(primary_keys_exports, {
    PrimaryKey: () => PrimaryKey,
    PrimaryKeyBuilder: () => PrimaryKeyBuilder,
    primaryKey: () => primaryKey
  });
  module.exports = __toCommonJS(primary_keys_exports);
  var import_entity18 = require_entity();
  var import_table3 = require_table3();
  function primaryKey(...config) {
    if (config[0].columns) {
      return new PrimaryKeyBuilder(config[0].columns, config[0].name);
    }
    return new PrimaryKeyBuilder(config);
  }

  class PrimaryKeyBuilder {
    static [import_entity18.entityKind] = "SQLitePrimaryKeyBuilder";
    columns;
    name;
    constructor(columns, name) {
      this.columns = columns;
      this.name = name;
    }
    build(table) {
      return new PrimaryKey(table, this.columns, this.name);
    }
  }

  class PrimaryKey {
    constructor(table, columns, name) {
      this.table = table;
      this.columns = columns;
      this.name = name;
    }
    static [import_entity18.entityKind] = "SQLitePrimaryKey";
    columns;
    name;
    getName() {
      return this.name ?? `${this.table[import_table3.SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/utils.cjs
var require_utils3 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var utils_exports = {};
  __export2(utils_exports, {
    extractUsedTable: () => extractUsedTable,
    getTableConfig: () => getTableConfig,
    getViewConfig: () => getViewConfig
  });
  module.exports = __toCommonJS(utils_exports);
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  var import_subquery2 = require_subquery();
  var import_table3 = require_table();
  var import_view_common2 = require_view_common();
  var import_checks = require_checks();
  var import_foreign_keys2 = require_foreign_keys2();
  var import_indexes = require_indexes();
  var import_primary_keys = require_primary_keys2();
  var import_table22 = require_table3();
  var import_unique_constraint3 = require_unique_constraint2();
  function getTableConfig(table) {
    const columns = Object.values(table[import_table22.SQLiteTable.Symbol.Columns]);
    const indexes = [];
    const checks = [];
    const primaryKeys = [];
    const uniqueConstraints = [];
    const foreignKeys = Object.values(table[import_table22.SQLiteTable.Symbol.InlineForeignKeys]);
    const name = table[import_table3.Table.Symbol.Name];
    const extraConfigBuilder = table[import_table22.SQLiteTable.Symbol.ExtraConfigBuilder];
    if (extraConfigBuilder !== undefined) {
      const extraConfig = extraConfigBuilder(table[import_table22.SQLiteTable.Symbol.Columns]);
      const extraValues = Array.isArray(extraConfig) ? extraConfig.flat(1) : Object.values(extraConfig);
      for (const builder of Object.values(extraValues)) {
        if ((0, import_entity18.is)(builder, import_indexes.IndexBuilder)) {
          indexes.push(builder.build(table));
        } else if ((0, import_entity18.is)(builder, import_checks.CheckBuilder)) {
          checks.push(builder.build(table));
        } else if ((0, import_entity18.is)(builder, import_unique_constraint3.UniqueConstraintBuilder)) {
          uniqueConstraints.push(builder.build(table));
        } else if ((0, import_entity18.is)(builder, import_primary_keys.PrimaryKeyBuilder)) {
          primaryKeys.push(builder.build(table));
        } else if ((0, import_entity18.is)(builder, import_foreign_keys2.ForeignKeyBuilder)) {
          foreignKeys.push(builder.build(table));
        }
      }
    }
    return {
      columns,
      indexes,
      foreignKeys,
      checks,
      primaryKeys,
      uniqueConstraints,
      name
    };
  }
  function extractUsedTable(table) {
    if ((0, import_entity18.is)(table, import_table22.SQLiteTable)) {
      return [`${table[import_table3.Table.Symbol.BaseName]}`];
    }
    if ((0, import_entity18.is)(table, import_subquery2.Subquery)) {
      return table._.usedTables ?? [];
    }
    if ((0, import_entity18.is)(table, import_sql2.SQL)) {
      return table.usedTables ?? [];
    }
    return [];
  }
  function getViewConfig(view) {
    return {
      ...view[import_view_common2.ViewBaseConfig]
    };
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/delete.cjs
var require_delete = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var delete_exports = {};
  __export2(delete_exports, {
    SQLiteDeleteBase: () => SQLiteDeleteBase
  });
  module.exports = __toCommonJS(delete_exports);
  var import_entity18 = require_entity();
  var import_query_promise = require_query_promise();
  var import_selection_proxy = require_selection_proxy();
  var import_table3 = require_table3();
  var import_table22 = require_table();
  var import_utils6 = require_utils();
  var import_utils22 = require_utils3();

  class SQLiteDeleteBase extends import_query_promise.QueryPromise {
    constructor(table, session, dialect, withList) {
      super();
      this.table = table;
      this.session = session;
      this.dialect = dialect;
      this.config = { table, withList };
    }
    static [import_entity18.entityKind] = "SQLiteDelete";
    config;
    where(where) {
      this.config.where = where;
      return this;
    }
    orderBy(...columns) {
      if (typeof columns[0] === "function") {
        const orderBy = columns[0](new Proxy(this.config.table[import_table22.Table.Symbol.Columns], new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
        const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
        this.config.orderBy = orderByArray;
      } else {
        const orderByArray = columns;
        this.config.orderBy = orderByArray;
      }
      return this;
    }
    limit(limit) {
      this.config.limit = limit;
      return this;
    }
    returning(fields = this.table[import_table3.SQLiteTable.Symbol.Columns]) {
      this.config.returning = (0, import_utils6.orderSelectedFields)(fields);
      return this;
    }
    getSQL() {
      return this.dialect.buildDeleteQuery(this.config);
    }
    toSQL() {
      const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
      return rest;
    }
    _prepare(isOneTimeQuery = true) {
      return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, undefined, {
        type: "delete",
        tables: (0, import_utils22.extractUsedTable)(this.config.table)
      });
    }
    prepare() {
      return this._prepare(false);
    }
    run = (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    };
    async execute(placeholderValues) {
      return this._prepare().execute(placeholderValues);
    }
    $dynamic() {
      return this;
    }
  }
});

// node_modules/drizzle-orm/casing.cjs
var require_casing = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var casing_exports = {};
  __export2(casing_exports, {
    CasingCache: () => CasingCache,
    toCamelCase: () => toCamelCase,
    toSnakeCase: () => toSnakeCase
  });
  module.exports = __toCommonJS(casing_exports);
  var import_entity18 = require_entity();
  var import_table3 = require_table();
  function toSnakeCase(input) {
    const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
    return words.map((word) => word.toLowerCase()).join("_");
  }
  function toCamelCase(input) {
    const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
    return words.reduce((acc, word, i) => {
      const formattedWord = i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
      return acc + formattedWord;
    }, "");
  }
  function noopCase(input) {
    return input;
  }

  class CasingCache {
    static [import_entity18.entityKind] = "CasingCache";
    cache = {};
    cachedTables = {};
    convert;
    constructor(casing) {
      this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
    }
    getColumnCasing(column) {
      if (!column.keyAsName)
        return column.name;
      const schema = column.table[import_table3.Table.Symbol.Schema] ?? "public";
      const tableName = column.table[import_table3.Table.Symbol.OriginalName];
      const key = `${schema}.${tableName}.${column.name}`;
      if (!this.cache[key]) {
        this.cacheTable(column.table);
      }
      return this.cache[key];
    }
    cacheTable(table) {
      const schema = table[import_table3.Table.Symbol.Schema] ?? "public";
      const tableName = table[import_table3.Table.Symbol.OriginalName];
      const tableKey = `${schema}.${tableName}`;
      if (!this.cachedTables[tableKey]) {
        for (const column of Object.values(table[import_table3.Table.Symbol.Columns])) {
          const columnKey = `${tableKey}.${column.name}`;
          this.cache[columnKey] = this.convert(column.name);
        }
        this.cachedTables[tableKey] = true;
      }
    }
    clearCache() {
      this.cache = {};
      this.cachedTables = {};
    }
  }
});

// node_modules/drizzle-orm/errors.cjs
var require_errors = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var errors_exports = {};
  __export2(errors_exports, {
    DrizzleError: () => DrizzleError,
    DrizzleQueryError: () => DrizzleQueryError,
    TransactionRollbackError: () => TransactionRollbackError
  });
  module.exports = __toCommonJS(errors_exports);
  var import_entity18 = require_entity();

  class DrizzleError extends Error {
    static [import_entity18.entityKind] = "DrizzleError";
    constructor({ message, cause }) {
      super(message);
      this.name = "DrizzleError";
      this.cause = cause;
    }
  }

  class DrizzleQueryError extends Error {
    constructor(query, params, cause) {
      super(`Failed query: ${query}
params: ${params}`);
      this.query = query;
      this.params = params;
      this.cause = cause;
      Error.captureStackTrace(this, DrizzleQueryError);
      if (cause)
        this.cause = cause;
    }
  }

  class TransactionRollbackError extends DrizzleError {
    static [import_entity18.entityKind] = "TransactionRollbackError";
    constructor() {
      super({ message: "Rollback" });
    }
  }
});

// node_modules/drizzle-orm/sql/functions/aggregate.cjs
var require_aggregate = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var aggregate_exports = {};
  __export2(aggregate_exports, {
    avg: () => avg,
    avgDistinct: () => avgDistinct,
    count: () => count,
    countDistinct: () => countDistinct,
    max: () => max,
    min: () => min,
    sum: () => sum,
    sumDistinct: () => sumDistinct
  });
  module.exports = __toCommonJS(aggregate_exports);
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();
  function count(expression) {
    return import_sql2.sql`count(${expression || import_sql2.sql.raw("*")})`.mapWith(Number);
  }
  function countDistinct(expression) {
    return import_sql2.sql`count(distinct ${expression})`.mapWith(Number);
  }
  function avg(expression) {
    return import_sql2.sql`avg(${expression})`.mapWith(String);
  }
  function avgDistinct(expression) {
    return import_sql2.sql`avg(distinct ${expression})`.mapWith(String);
  }
  function sum(expression) {
    return import_sql2.sql`sum(${expression})`.mapWith(String);
  }
  function sumDistinct(expression) {
    return import_sql2.sql`sum(distinct ${expression})`.mapWith(String);
  }
  function max(expression) {
    return import_sql2.sql`max(${expression})`.mapWith((0, import_entity18.is)(expression, import_column4.Column) ? expression : String);
  }
  function min(expression) {
    return import_sql2.sql`min(${expression})`.mapWith((0, import_entity18.is)(expression, import_column4.Column) ? expression : String);
  }
});

// node_modules/drizzle-orm/sql/functions/vector.cjs
var require_vector2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var vector_exports = {};
  __export2(vector_exports, {
    cosineDistance: () => cosineDistance,
    hammingDistance: () => hammingDistance,
    innerProduct: () => innerProduct,
    jaccardDistance: () => jaccardDistance,
    l1Distance: () => l1Distance,
    l2Distance: () => l2Distance
  });
  module.exports = __toCommonJS(vector_exports);
  var import_sql2 = require_sql();
  function toSql(value) {
    return JSON.stringify(value);
  }
  function l2Distance(column, value) {
    if (Array.isArray(value)) {
      return import_sql2.sql`${column} <-> ${toSql(value)}`;
    }
    return import_sql2.sql`${column} <-> ${value}`;
  }
  function l1Distance(column, value) {
    if (Array.isArray(value)) {
      return import_sql2.sql`${column} <+> ${toSql(value)}`;
    }
    return import_sql2.sql`${column} <+> ${value}`;
  }
  function innerProduct(column, value) {
    if (Array.isArray(value)) {
      return import_sql2.sql`${column} <#> ${toSql(value)}`;
    }
    return import_sql2.sql`${column} <#> ${value}`;
  }
  function cosineDistance(column, value) {
    if (Array.isArray(value)) {
      return import_sql2.sql`${column} <=> ${toSql(value)}`;
    }
    return import_sql2.sql`${column} <=> ${value}`;
  }
  function hammingDistance(column, value) {
    if (Array.isArray(value)) {
      return import_sql2.sql`${column} <~> ${toSql(value)}`;
    }
    return import_sql2.sql`${column} <~> ${value}`;
  }
  function jaccardDistance(column, value) {
    if (Array.isArray(value)) {
      return import_sql2.sql`${column} <%> ${toSql(value)}`;
    }
    return import_sql2.sql`${column} <%> ${value}`;
  }
});

// node_modules/drizzle-orm/sql/functions/index.cjs
var require_functions = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var functions_exports = {};
  module.exports = __toCommonJS(functions_exports);
  __reExport(functions_exports, require_aggregate(), module.exports);
  __reExport(functions_exports, require_vector2(), module.exports);
});

// node_modules/drizzle-orm/sql/index.cjs
var require_sql2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var sql_exports = {};
  module.exports = __toCommonJS(sql_exports);
  __reExport(sql_exports, require_expressions(), module.exports);
  __reExport(sql_exports, require_functions(), module.exports);
  __reExport(sql_exports, require_sql(), module.exports);
});

// node_modules/drizzle-orm/sqlite-core/columns/index.cjs
var require_columns = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var columns_exports = {};
  module.exports = __toCommonJS(columns_exports);
  __reExport(columns_exports, require_blob(), module.exports);
  __reExport(columns_exports, require_common2(), module.exports);
  __reExport(columns_exports, require_custom2(), module.exports);
  __reExport(columns_exports, require_integer2(), module.exports);
  __reExport(columns_exports, require_numeric2(), module.exports);
  __reExport(columns_exports, require_real2(), module.exports);
  __reExport(columns_exports, require_text2(), module.exports);
});

// node_modules/drizzle-orm/sqlite-core/view-base.cjs
var require_view_base = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var view_base_exports = {};
  __export2(view_base_exports, {
    SQLiteViewBase: () => SQLiteViewBase
  });
  module.exports = __toCommonJS(view_base_exports);
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();

  class SQLiteViewBase extends import_sql2.View {
    static [import_entity18.entityKind] = "SQLiteViewBase";
  }
});

// node_modules/drizzle-orm/sqlite-core/dialect.cjs
var require_dialect = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var dialect_exports = {};
  __export2(dialect_exports, {
    SQLiteAsyncDialect: () => SQLiteAsyncDialect,
    SQLiteDialect: () => SQLiteDialect,
    SQLiteSyncDialect: () => SQLiteSyncDialect
  });
  module.exports = __toCommonJS(dialect_exports);
  var import_alias = require_alias();
  var import_casing = require_casing();
  var import_column4 = require_column();
  var import_entity18 = require_entity();
  var import_errors = require_errors();
  var import_relations = require_relations();
  var import_sql2 = require_sql2();
  var import_sql22 = require_sql();
  var import_columns = require_columns();
  var import_table3 = require_table3();
  var import_subquery2 = require_subquery();
  var import_table22 = require_table();
  var import_utils6 = require_utils();
  var import_view_common2 = require_view_common();
  var import_view_base = require_view_base();

  class SQLiteDialect {
    static [import_entity18.entityKind] = "SQLiteDialect";
    casing;
    constructor(config) {
      this.casing = new import_casing.CasingCache(config?.casing);
    }
    escapeName(name) {
      return `"${name.replace(/"/g, '""')}"`;
    }
    escapeParam(_num) {
      return "?";
    }
    escapeString(str) {
      return `'${str.replace(/'/g, "''")}'`;
    }
    buildWithCTE(queries) {
      if (!queries?.length)
        return;
      const withSqlChunks = [import_sql22.sql`with `];
      for (const [i, w] of queries.entries()) {
        withSqlChunks.push(import_sql22.sql`${import_sql22.sql.identifier(w._.alias)} as (${w._.sql})`);
        if (i < queries.length - 1) {
          withSqlChunks.push(import_sql22.sql`, `);
        }
      }
      withSqlChunks.push(import_sql22.sql` `);
      return import_sql22.sql.join(withSqlChunks);
    }
    buildDeleteQuery({
      table,
      where,
      returning,
      withList,
      limit,
      orderBy
    }) {
      const withSql = this.buildWithCTE(withList);
      const returningSql = returning ? import_sql22.sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
      const whereSql = where ? import_sql22.sql` where ${where}` : undefined;
      const orderBySql = this.buildOrderBy(orderBy);
      const limitSql = this.buildLimit(limit);
      return import_sql22.sql`${withSql}delete from ${table}${whereSql}${returningSql}${orderBySql}${limitSql}`;
    }
    buildUpdateSet(table, set) {
      const tableColumns = table[import_table22.Table.Symbol.Columns];
      const columnNames = Object.keys(tableColumns).filter((colName) => set[colName] !== undefined || tableColumns[colName]?.onUpdateFn !== undefined);
      const setSize = columnNames.length;
      return import_sql22.sql.join(columnNames.flatMap((colName, i) => {
        const col = tableColumns[colName];
        const onUpdateFnResult = col.onUpdateFn?.();
        const value = set[colName] ?? ((0, import_entity18.is)(onUpdateFnResult, import_sql22.SQL) ? onUpdateFnResult : import_sql22.sql.param(onUpdateFnResult, col));
        const res = import_sql22.sql`${import_sql22.sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
        if (i < setSize - 1) {
          return [res, import_sql22.sql.raw(", ")];
        }
        return [res];
      }));
    }
    buildUpdateQuery({
      table,
      set,
      where,
      returning,
      withList,
      joins,
      from,
      limit,
      orderBy
    }) {
      const withSql = this.buildWithCTE(withList);
      const setSql = this.buildUpdateSet(table, set);
      const fromSql = from && import_sql22.sql.join([import_sql22.sql.raw(" from "), this.buildFromTable(from)]);
      const joinsSql = this.buildJoins(joins);
      const returningSql = returning ? import_sql22.sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
      const whereSql = where ? import_sql22.sql` where ${where}` : undefined;
      const orderBySql = this.buildOrderBy(orderBy);
      const limitSql = this.buildLimit(limit);
      return import_sql22.sql`${withSql}update ${table} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}${orderBySql}${limitSql}`;
    }
    buildSelection(fields, { isSingleTable = false } = {}) {
      const columnsLen = fields.length;
      const chunks = fields.flatMap(({ field }, i) => {
        const chunk = [];
        if ((0, import_entity18.is)(field, import_sql22.SQL.Aliased) && field.isSelectionField) {
          chunk.push(import_sql22.sql.identifier(field.fieldAlias));
        } else if ((0, import_entity18.is)(field, import_sql22.SQL.Aliased) || (0, import_entity18.is)(field, import_sql22.SQL)) {
          const query = (0, import_entity18.is)(field, import_sql22.SQL.Aliased) ? field.sql : field;
          if (isSingleTable) {
            chunk.push(new import_sql22.SQL(query.queryChunks.map((c) => {
              if ((0, import_entity18.is)(c, import_column4.Column)) {
                return import_sql22.sql.identifier(this.casing.getColumnCasing(c));
              }
              return c;
            })));
          } else {
            chunk.push(query);
          }
          if ((0, import_entity18.is)(field, import_sql22.SQL.Aliased)) {
            chunk.push(import_sql22.sql` as ${import_sql22.sql.identifier(field.fieldAlias)}`);
          }
        } else if ((0, import_entity18.is)(field, import_column4.Column)) {
          const tableName = field.table[import_table22.Table.Symbol.Name];
          if (field.columnType === "SQLiteNumericBigInt") {
            if (isSingleTable) {
              chunk.push(import_sql22.sql`cast(${import_sql22.sql.identifier(this.casing.getColumnCasing(field))} as text)`);
            } else {
              chunk.push(import_sql22.sql`cast(${import_sql22.sql.identifier(tableName)}.${import_sql22.sql.identifier(this.casing.getColumnCasing(field))} as text)`);
            }
          } else {
            if (isSingleTable) {
              chunk.push(import_sql22.sql.identifier(this.casing.getColumnCasing(field)));
            } else {
              chunk.push(import_sql22.sql`${import_sql22.sql.identifier(tableName)}.${import_sql22.sql.identifier(this.casing.getColumnCasing(field))}`);
            }
          }
        } else if ((0, import_entity18.is)(field, import_subquery2.Subquery)) {
          const entries = Object.entries(field._.selectedFields);
          if (entries.length === 1) {
            const entry = entries[0][1];
            const fieldDecoder = (0, import_entity18.is)(entry, import_sql22.SQL) ? entry.decoder : (0, import_entity18.is)(entry, import_column4.Column) ? { mapFromDriverValue: (v) => entry.mapFromDriverValue(v) } : entry.sql.decoder;
            if (fieldDecoder)
              field._.sql.decoder = fieldDecoder;
          }
          chunk.push(field);
        }
        if (i < columnsLen - 1) {
          chunk.push(import_sql22.sql`, `);
        }
        return chunk;
      });
      return import_sql22.sql.join(chunks);
    }
    buildJoins(joins) {
      if (!joins || joins.length === 0) {
        return;
      }
      const joinsArray = [];
      if (joins) {
        for (const [index, joinMeta] of joins.entries()) {
          if (index === 0) {
            joinsArray.push(import_sql22.sql` `);
          }
          const table = joinMeta.table;
          const onSql = joinMeta.on ? import_sql22.sql` on ${joinMeta.on}` : undefined;
          if ((0, import_entity18.is)(table, import_table3.SQLiteTable)) {
            const tableName = table[import_table3.SQLiteTable.Symbol.Name];
            const tableSchema = table[import_table3.SQLiteTable.Symbol.Schema];
            const origTableName = table[import_table3.SQLiteTable.Symbol.OriginalName];
            const alias = tableName === origTableName ? undefined : joinMeta.alias;
            joinsArray.push(import_sql22.sql`${import_sql22.sql.raw(joinMeta.joinType)} join ${tableSchema ? import_sql22.sql`${import_sql22.sql.identifier(tableSchema)}.` : undefined}${import_sql22.sql.identifier(origTableName)}${alias && import_sql22.sql` ${import_sql22.sql.identifier(alias)}`}${onSql}`);
          } else {
            joinsArray.push(import_sql22.sql`${import_sql22.sql.raw(joinMeta.joinType)} join ${table}${onSql}`);
          }
          if (index < joins.length - 1) {
            joinsArray.push(import_sql22.sql` `);
          }
        }
      }
      return import_sql22.sql.join(joinsArray);
    }
    buildLimit(limit) {
      return typeof limit === "object" || typeof limit === "number" && limit >= 0 ? import_sql22.sql` limit ${limit}` : undefined;
    }
    buildOrderBy(orderBy) {
      const orderByList = [];
      if (orderBy) {
        for (const [index, orderByValue] of orderBy.entries()) {
          orderByList.push(orderByValue);
          if (index < orderBy.length - 1) {
            orderByList.push(import_sql22.sql`, `);
          }
        }
      }
      return orderByList.length > 0 ? import_sql22.sql` order by ${import_sql22.sql.join(orderByList)}` : undefined;
    }
    buildFromTable(table) {
      if ((0, import_entity18.is)(table, import_table22.Table) && table[import_table22.Table.Symbol.IsAlias]) {
        return import_sql22.sql`${import_sql22.sql`${import_sql22.sql.identifier(table[import_table22.Table.Symbol.Schema] ?? "")}.`.if(table[import_table22.Table.Symbol.Schema])}${import_sql22.sql.identifier(table[import_table22.Table.Symbol.OriginalName])} ${import_sql22.sql.identifier(table[import_table22.Table.Symbol.Name])}`;
      }
      return table;
    }
    buildSelectQuery({
      withList,
      fields,
      fieldsFlat,
      where,
      having,
      table,
      joins,
      orderBy,
      groupBy,
      limit,
      offset,
      distinct,
      setOperators
    }) {
      const fieldsList = fieldsFlat ?? (0, import_utils6.orderSelectedFields)(fields);
      for (const f of fieldsList) {
        if ((0, import_entity18.is)(f.field, import_column4.Column) && (0, import_table22.getTableName)(f.field.table) !== ((0, import_entity18.is)(table, import_subquery2.Subquery) ? table._.alias : (0, import_entity18.is)(table, import_view_base.SQLiteViewBase) ? table[import_view_common2.ViewBaseConfig].name : (0, import_entity18.is)(table, import_sql22.SQL) ? undefined : (0, import_table22.getTableName)(table)) && !((table2) => joins?.some(({ alias }) => alias === (table2[import_table22.Table.Symbol.IsAlias] ? (0, import_table22.getTableName)(table2) : table2[import_table22.Table.Symbol.BaseName])))(f.field.table)) {
          const tableName = (0, import_table22.getTableName)(f.field.table);
          throw new Error(`Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
        }
      }
      const isSingleTable = !joins || joins.length === 0;
      const withSql = this.buildWithCTE(withList);
      const distinctSql = distinct ? import_sql22.sql` distinct` : undefined;
      const selection = this.buildSelection(fieldsList, { isSingleTable });
      const tableSql = this.buildFromTable(table);
      const joinsSql = this.buildJoins(joins);
      const whereSql = where ? import_sql22.sql` where ${where}` : undefined;
      const havingSql = having ? import_sql22.sql` having ${having}` : undefined;
      const groupByList = [];
      if (groupBy) {
        for (const [index, groupByValue] of groupBy.entries()) {
          groupByList.push(groupByValue);
          if (index < groupBy.length - 1) {
            groupByList.push(import_sql22.sql`, `);
          }
        }
      }
      const groupBySql = groupByList.length > 0 ? import_sql22.sql` group by ${import_sql22.sql.join(groupByList)}` : undefined;
      const orderBySql = this.buildOrderBy(orderBy);
      const limitSql = this.buildLimit(limit);
      const offsetSql = offset ? import_sql22.sql` offset ${offset}` : undefined;
      const finalQuery = import_sql22.sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
      if (setOperators.length > 0) {
        return this.buildSetOperations(finalQuery, setOperators);
      }
      return finalQuery;
    }
    buildSetOperations(leftSelect, setOperators) {
      const [setOperator, ...rest] = setOperators;
      if (!setOperator) {
        throw new Error("Cannot pass undefined values to any set operator");
      }
      if (rest.length === 0) {
        return this.buildSetOperationQuery({ leftSelect, setOperator });
      }
      return this.buildSetOperations(this.buildSetOperationQuery({ leftSelect, setOperator }), rest);
    }
    buildSetOperationQuery({
      leftSelect,
      setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
    }) {
      const leftChunk = import_sql22.sql`${leftSelect.getSQL()} `;
      const rightChunk = import_sql22.sql`${rightSelect.getSQL()}`;
      let orderBySql;
      if (orderBy && orderBy.length > 0) {
        const orderByValues = [];
        for (const singleOrderBy of orderBy) {
          if ((0, import_entity18.is)(singleOrderBy, import_columns.SQLiteColumn)) {
            orderByValues.push(import_sql22.sql.identifier(singleOrderBy.name));
          } else if ((0, import_entity18.is)(singleOrderBy, import_sql22.SQL)) {
            for (let i = 0;i < singleOrderBy.queryChunks.length; i++) {
              const chunk = singleOrderBy.queryChunks[i];
              if ((0, import_entity18.is)(chunk, import_columns.SQLiteColumn)) {
                singleOrderBy.queryChunks[i] = import_sql22.sql.identifier(this.casing.getColumnCasing(chunk));
              }
            }
            orderByValues.push(import_sql22.sql`${singleOrderBy}`);
          } else {
            orderByValues.push(import_sql22.sql`${singleOrderBy}`);
          }
        }
        orderBySql = import_sql22.sql` order by ${import_sql22.sql.join(orderByValues, import_sql22.sql`, `)}`;
      }
      const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? import_sql22.sql` limit ${limit}` : undefined;
      const operatorChunk = import_sql22.sql.raw(`${type} ${isAll ? "all " : ""}`);
      const offsetSql = offset ? import_sql22.sql` offset ${offset}` : undefined;
      return import_sql22.sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
    }
    buildInsertQuery({
      table,
      values: valuesOrSelect,
      onConflict,
      returning,
      withList,
      select
    }) {
      const valuesSqlList = [];
      const columns = table[import_table22.Table.Symbol.Columns];
      const colEntries = Object.entries(columns).filter(([_, col]) => !col.shouldDisableInsert());
      const insertOrder = colEntries.map(([, column]) => import_sql22.sql.identifier(this.casing.getColumnCasing(column)));
      if (select) {
        const select2 = valuesOrSelect;
        if ((0, import_entity18.is)(select2, import_sql22.SQL)) {
          valuesSqlList.push(select2);
        } else {
          valuesSqlList.push(select2.getSQL());
        }
      } else {
        const values = valuesOrSelect;
        valuesSqlList.push(import_sql22.sql.raw("values "));
        for (const [valueIndex, value] of values.entries()) {
          const valueList = [];
          for (const [fieldName, col] of colEntries) {
            const colValue = value[fieldName];
            if (colValue === undefined || (0, import_entity18.is)(colValue, import_sql22.Param) && colValue.value === undefined) {
              let defaultValue;
              if (col.default !== null && col.default !== undefined) {
                defaultValue = (0, import_entity18.is)(col.default, import_sql22.SQL) ? col.default : import_sql22.sql.param(col.default, col);
              } else if (col.defaultFn !== undefined) {
                const defaultFnResult = col.defaultFn();
                defaultValue = (0, import_entity18.is)(defaultFnResult, import_sql22.SQL) ? defaultFnResult : import_sql22.sql.param(defaultFnResult, col);
              } else if (!col.default && col.onUpdateFn !== undefined) {
                const onUpdateFnResult = col.onUpdateFn();
                defaultValue = (0, import_entity18.is)(onUpdateFnResult, import_sql22.SQL) ? onUpdateFnResult : import_sql22.sql.param(onUpdateFnResult, col);
              } else {
                defaultValue = import_sql22.sql`null`;
              }
              valueList.push(defaultValue);
            } else {
              valueList.push(colValue);
            }
          }
          valuesSqlList.push(valueList);
          if (valueIndex < values.length - 1) {
            valuesSqlList.push(import_sql22.sql`, `);
          }
        }
      }
      const withSql = this.buildWithCTE(withList);
      const valuesSql = import_sql22.sql.join(valuesSqlList);
      const returningSql = returning ? import_sql22.sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
      const onConflictSql = onConflict?.length ? import_sql22.sql.join(onConflict) : undefined;
      return import_sql22.sql`${withSql}insert into ${table} ${insertOrder} ${valuesSql}${onConflictSql}${returningSql}`;
    }
    sqlToQuery(sql2, invokeSource) {
      return sql2.toQuery({
        casing: this.casing,
        escapeName: this.escapeName,
        escapeParam: this.escapeParam,
        escapeString: this.escapeString,
        invokeSource
      });
    }
    buildRelationalQuery({
      fullSchema,
      schema,
      tableNamesMap,
      table,
      tableConfig,
      queryConfig: config,
      tableAlias,
      nestedQueryRelation,
      joinOn
    }) {
      let selection = [];
      let limit, offset, orderBy = [], where;
      const joins = [];
      if (config === true) {
        const selectionEntries = Object.entries(tableConfig.columns);
        selection = selectionEntries.map(([key, value]) => ({
          dbKey: value.name,
          tsKey: key,
          field: (0, import_alias.aliasedTableColumn)(value, tableAlias),
          relationTableTsKey: undefined,
          isJson: false,
          selection: []
        }));
      } else {
        const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value]) => [
          key,
          (0, import_alias.aliasedTableColumn)(value, tableAlias)
        ]));
        if (config.where) {
          const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, (0, import_relations.getOperators)()) : config.where;
          where = whereSql && (0, import_alias.mapColumnsInSQLToAlias)(whereSql, tableAlias);
        }
        const fieldsSelection = [];
        let selectedColumns = [];
        if (config.columns) {
          let isIncludeMode = false;
          for (const [field, value] of Object.entries(config.columns)) {
            if (value === undefined) {
              continue;
            }
            if (field in tableConfig.columns) {
              if (!isIncludeMode && value === true) {
                isIncludeMode = true;
              }
              selectedColumns.push(field);
            }
          }
          if (selectedColumns.length > 0) {
            selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
          }
        } else {
          selectedColumns = Object.keys(tableConfig.columns);
        }
        for (const field of selectedColumns) {
          const column = tableConfig.columns[field];
          fieldsSelection.push({ tsKey: field, value: column });
        }
        let selectedRelations = [];
        if (config.with) {
          selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({
            tsKey,
            queryConfig,
            relation: tableConfig.relations[tsKey]
          }));
        }
        let extras;
        if (config.extras) {
          extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql: import_sql22.sql }) : config.extras;
          for (const [tsKey, value] of Object.entries(extras)) {
            fieldsSelection.push({
              tsKey,
              value: (0, import_alias.mapColumnsInAliasedSQLToAlias)(value, tableAlias)
            });
          }
        }
        for (const { tsKey, value } of fieldsSelection) {
          selection.push({
            dbKey: (0, import_entity18.is)(value, import_sql22.SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
            tsKey,
            field: (0, import_entity18.is)(value, import_column4.Column) ? (0, import_alias.aliasedTableColumn)(value, tableAlias) : value,
            relationTableTsKey: undefined,
            isJson: false,
            selection: []
          });
        }
        let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, (0, import_relations.getOrderByOperators)()) : config.orderBy ?? [];
        if (!Array.isArray(orderByOrig)) {
          orderByOrig = [orderByOrig];
        }
        orderBy = orderByOrig.map((orderByValue) => {
          if ((0, import_entity18.is)(orderByValue, import_column4.Column)) {
            return (0, import_alias.aliasedTableColumn)(orderByValue, tableAlias);
          }
          return (0, import_alias.mapColumnsInSQLToAlias)(orderByValue, tableAlias);
        });
        limit = config.limit;
        offset = config.offset;
        for (const {
          tsKey: selectedRelationTsKey,
          queryConfig: selectedRelationConfigValue,
          relation
        } of selectedRelations) {
          const normalizedRelation = (0, import_relations.normalizeRelation)(schema, tableNamesMap, relation);
          const relationTableName = (0, import_table22.getTableUniqueName)(relation.referencedTable);
          const relationTableTsName = tableNamesMap[relationTableName];
          const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
          const joinOn2 = (0, import_sql2.and)(...normalizedRelation.fields.map((field2, i) => (0, import_sql2.eq)((0, import_alias.aliasedTableColumn)(normalizedRelation.references[i], relationTableAlias), (0, import_alias.aliasedTableColumn)(field2, tableAlias))));
          const builtRelation = this.buildRelationalQuery({
            fullSchema,
            schema,
            tableNamesMap,
            table: fullSchema[relationTableTsName],
            tableConfig: schema[relationTableTsName],
            queryConfig: (0, import_entity18.is)(relation, import_relations.One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
            tableAlias: relationTableAlias,
            joinOn: joinOn2,
            nestedQueryRelation: relation
          });
          const field = import_sql22.sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
          selection.push({
            dbKey: selectedRelationTsKey,
            tsKey: selectedRelationTsKey,
            field,
            relationTableTsKey: relationTableTsName,
            isJson: true,
            selection: builtRelation.selection
          });
        }
      }
      if (selection.length === 0) {
        throw new import_errors.DrizzleError({
          message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
        });
      }
      let result;
      where = (0, import_sql2.and)(joinOn, where);
      if (nestedQueryRelation) {
        let field = import_sql22.sql`json_array(${import_sql22.sql.join(selection.map(({ field: field2 }) => (0, import_entity18.is)(field2, import_columns.SQLiteColumn) ? import_sql22.sql.identifier(this.casing.getColumnCasing(field2)) : (0, import_entity18.is)(field2, import_sql22.SQL.Aliased) ? field2.sql : field2), import_sql22.sql`, `)})`;
        if ((0, import_entity18.is)(nestedQueryRelation, import_relations.Many)) {
          field = import_sql22.sql`coalesce(json_group_array(${field}), json_array())`;
        }
        const nestedSelection = [
          {
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }
        ];
        const needsSubquery = limit !== undefined || offset !== undefined || orderBy.length > 0;
        if (needsSubquery) {
          result = this.buildSelectQuery({
            table: (0, import_alias.aliasedTable)(table, tableAlias),
            fields: {},
            fieldsFlat: [
              {
                path: [],
                field: import_sql22.sql.raw("*")
              }
            ],
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
          where = undefined;
          limit = undefined;
          offset = undefined;
          orderBy = undefined;
        } else {
          result = (0, import_alias.aliasedTable)(table, tableAlias);
        }
        result = this.buildSelectQuery({
          table: (0, import_entity18.is)(result, import_table3.SQLiteTable) ? result : new import_subquery2.Subquery(result, {}, tableAlias),
          fields: {},
          fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
            path: [],
            field: (0, import_entity18.is)(field2, import_column4.Column) ? (0, import_alias.aliasedTableColumn)(field2, tableAlias) : field2
          })),
          joins,
          where,
          limit,
          offset,
          orderBy,
          setOperators: []
        });
      } else {
        result = this.buildSelectQuery({
          table: (0, import_alias.aliasedTable)(table, tableAlias),
          fields: {},
          fieldsFlat: selection.map(({ field }) => ({
            path: [],
            field: (0, import_entity18.is)(field, import_column4.Column) ? (0, import_alias.aliasedTableColumn)(field, tableAlias) : field
          })),
          joins,
          where,
          limit,
          offset,
          orderBy,
          setOperators: []
        });
      }
      return {
        tableTsKey: tableConfig.tsName,
        sql: result,
        selection
      };
    }
  }

  class SQLiteSyncDialect extends SQLiteDialect {
    static [import_entity18.entityKind] = "SQLiteSyncDialect";
    migrate(migrations, session, config) {
      const migrationsTable = config === undefined ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
      const migrationTableCreate = import_sql22.sql`
			CREATE TABLE IF NOT EXISTS ${import_sql22.sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
      session.run(migrationTableCreate);
      const dbMigrations = session.values(import_sql22.sql`SELECT id, hash, created_at FROM ${import_sql22.sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`);
      const lastDbMigration = dbMigrations[0] ?? undefined;
      session.run(import_sql22.sql`BEGIN`);
      try {
        for (const migration of migrations) {
          if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
            for (const stmt of migration.sql) {
              session.run(import_sql22.sql.raw(stmt));
            }
            session.run(import_sql22.sql`INSERT INTO ${import_sql22.sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
          }
        }
        session.run(import_sql22.sql`COMMIT`);
      } catch (e) {
        session.run(import_sql22.sql`ROLLBACK`);
        throw e;
      }
    }
  }

  class SQLiteAsyncDialect extends SQLiteDialect {
    static [import_entity18.entityKind] = "SQLiteAsyncDialect";
    async migrate(migrations, session, config) {
      const migrationsTable = config === undefined ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
      const migrationTableCreate = import_sql22.sql`
			CREATE TABLE IF NOT EXISTS ${import_sql22.sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
      await session.run(migrationTableCreate);
      const dbMigrations = await session.values(import_sql22.sql`SELECT id, hash, created_at FROM ${import_sql22.sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`);
      const lastDbMigration = dbMigrations[0] ?? undefined;
      await session.transaction(async (tx) => {
        for (const migration of migrations) {
          if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
            for (const stmt of migration.sql) {
              await tx.run(import_sql22.sql.raw(stmt));
            }
            await tx.run(import_sql22.sql`INSERT INTO ${import_sql22.sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
          }
        }
      });
    }
  }
});

// node_modules/drizzle-orm/query-builders/query-builder.cjs
var require_query_builder = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var query_builder_exports = {};
  __export2(query_builder_exports, {
    TypedQueryBuilder: () => TypedQueryBuilder
  });
  module.exports = __toCommonJS(query_builder_exports);
  var import_entity18 = require_entity();

  class TypedQueryBuilder {
    static [import_entity18.entityKind] = "TypedQueryBuilder";
    getSelectedFields() {
      return this._.selectedFields;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/select.cjs
var require_select2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except2, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except2)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var select_exports = {};
  __export2(select_exports, {
    SQLiteSelectBase: () => SQLiteSelectBase,
    SQLiteSelectBuilder: () => SQLiteSelectBuilder,
    SQLiteSelectQueryBuilderBase: () => SQLiteSelectQueryBuilderBase,
    except: () => except,
    intersect: () => intersect,
    union: () => union,
    unionAll: () => unionAll
  });
  module.exports = __toCommonJS(select_exports);
  var import_entity18 = require_entity();
  var import_query_builder = require_query_builder();
  var import_query_promise = require_query_promise();
  var import_selection_proxy = require_selection_proxy();
  var import_sql2 = require_sql();
  var import_subquery2 = require_subquery();
  var import_table3 = require_table();
  var import_utils6 = require_utils();
  var import_view_common2 = require_view_common();
  var import_utils22 = require_utils3();
  var import_view_base = require_view_base();

  class SQLiteSelectBuilder {
    static [import_entity18.entityKind] = "SQLiteSelectBuilder";
    fields;
    session;
    dialect;
    withList;
    distinct;
    constructor(config) {
      this.fields = config.fields;
      this.session = config.session;
      this.dialect = config.dialect;
      this.withList = config.withList;
      this.distinct = config.distinct;
    }
    from(source) {
      const isPartialSelect = !!this.fields;
      let fields;
      if (this.fields) {
        fields = this.fields;
      } else if ((0, import_entity18.is)(source, import_subquery2.Subquery)) {
        fields = Object.fromEntries(Object.keys(source._.selectedFields).map((key) => [key, source[key]]));
      } else if ((0, import_entity18.is)(source, import_view_base.SQLiteViewBase)) {
        fields = source[import_view_common2.ViewBaseConfig].selectedFields;
      } else if ((0, import_entity18.is)(source, import_sql2.SQL)) {
        fields = {};
      } else {
        fields = (0, import_utils6.getTableColumns)(source);
      }
      return new SQLiteSelectBase({
        table: source,
        fields,
        isPartialSelect,
        session: this.session,
        dialect: this.dialect,
        withList: this.withList,
        distinct: this.distinct
      });
    }
  }

  class SQLiteSelectQueryBuilderBase extends import_query_builder.TypedQueryBuilder {
    static [import_entity18.entityKind] = "SQLiteSelectQueryBuilder";
    _;
    config;
    joinsNotNullableMap;
    tableName;
    isPartialSelect;
    session;
    dialect;
    cacheConfig = undefined;
    usedTables = /* @__PURE__ */ new Set;
    constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
      super();
      this.config = {
        withList,
        table,
        fields: { ...fields },
        distinct,
        setOperators: []
      };
      this.isPartialSelect = isPartialSelect;
      this.session = session;
      this.dialect = dialect;
      this._ = {
        selectedFields: fields,
        config: this.config
      };
      this.tableName = (0, import_utils6.getTableLikeName)(table);
      this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
      for (const item of (0, import_utils22.extractUsedTable)(table))
        this.usedTables.add(item);
    }
    getUsedTables() {
      return [...this.usedTables];
    }
    createJoin(joinType) {
      return (table, on) => {
        const baseTableName = this.tableName;
        const tableName = (0, import_utils6.getTableLikeName)(table);
        for (const item of (0, import_utils22.extractUsedTable)(table))
          this.usedTables.add(item);
        if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
          throw new Error(`Alias "${tableName}" is already used in this query`);
        }
        if (!this.isPartialSelect) {
          if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
            this.config.fields = {
              [baseTableName]: this.config.fields
            };
          }
          if (typeof tableName === "string" && !(0, import_entity18.is)(table, import_sql2.SQL)) {
            const selection = (0, import_entity18.is)(table, import_subquery2.Subquery) ? table._.selectedFields : (0, import_entity18.is)(table, import_sql2.View) ? table[import_view_common2.ViewBaseConfig].selectedFields : table[import_table3.Table.Symbol.Columns];
            this.config.fields[tableName] = selection;
          }
        }
        if (typeof on === "function") {
          on = on(new Proxy(this.config.fields, new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        if (!this.config.joins) {
          this.config.joins = [];
        }
        this.config.joins.push({ on, table, joinType, alias: tableName });
        if (typeof tableName === "string") {
          switch (joinType) {
            case "left": {
              this.joinsNotNullableMap[tableName] = false;
              break;
            }
            case "right": {
              this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
              this.joinsNotNullableMap[tableName] = true;
              break;
            }
            case "cross":
            case "inner": {
              this.joinsNotNullableMap[tableName] = true;
              break;
            }
            case "full": {
              this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
              this.joinsNotNullableMap[tableName] = false;
              break;
            }
          }
        }
        return this;
      };
    }
    leftJoin = this.createJoin("left");
    rightJoin = this.createJoin("right");
    innerJoin = this.createJoin("inner");
    fullJoin = this.createJoin("full");
    crossJoin = this.createJoin("cross");
    createSetOperator(type, isAll) {
      return (rightSelection) => {
        const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
        if (!(0, import_utils6.haveSameKeys)(this.getSelectedFields(), rightSelect.getSelectedFields())) {
          throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
        }
        this.config.setOperators.push({ type, isAll, rightSelect });
        return this;
      };
    }
    union = this.createSetOperator("union", false);
    unionAll = this.createSetOperator("union", true);
    intersect = this.createSetOperator("intersect", false);
    except = this.createSetOperator("except", false);
    addSetOperators(setOperators) {
      this.config.setOperators.push(...setOperators);
      return this;
    }
    where(where) {
      if (typeof where === "function") {
        where = where(new Proxy(this.config.fields, new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
      }
      this.config.where = where;
      return this;
    }
    having(having) {
      if (typeof having === "function") {
        having = having(new Proxy(this.config.fields, new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
      }
      this.config.having = having;
      return this;
    }
    groupBy(...columns) {
      if (typeof columns[0] === "function") {
        const groupBy = columns[0](new Proxy(this.config.fields, new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
        this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
      } else {
        this.config.groupBy = columns;
      }
      return this;
    }
    orderBy(...columns) {
      if (typeof columns[0] === "function") {
        const orderBy = columns[0](new Proxy(this.config.fields, new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
        const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).orderBy = orderByArray;
        } else {
          this.config.orderBy = orderByArray;
        }
      } else {
        const orderByArray = columns;
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).orderBy = orderByArray;
        } else {
          this.config.orderBy = orderByArray;
        }
      }
      return this;
    }
    limit(limit) {
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).limit = limit;
      } else {
        this.config.limit = limit;
      }
      return this;
    }
    offset(offset) {
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).offset = offset;
      } else {
        this.config.offset = offset;
      }
      return this;
    }
    getSQL() {
      return this.dialect.buildSelectQuery(this.config);
    }
    toSQL() {
      const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
      return rest;
    }
    as(alias) {
      const usedTables = [];
      usedTables.push(...(0, import_utils22.extractUsedTable)(this.config.table));
      if (this.config.joins) {
        for (const it of this.config.joins)
          usedTables.push(...(0, import_utils22.extractUsedTable)(it.table));
      }
      return new Proxy(new import_subquery2.Subquery(this.getSQL(), this.config.fields, alias, false, [...new Set(usedTables)]), new import_selection_proxy.SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
    }
    getSelectedFields() {
      return new Proxy(this.config.fields, new import_selection_proxy.SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
    }
    $dynamic() {
      return this;
    }
  }

  class SQLiteSelectBase extends SQLiteSelectQueryBuilderBase {
    static [import_entity18.entityKind] = "SQLiteSelect";
    _prepare(isOneTimeQuery = true) {
      if (!this.session) {
        throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
      }
      const fieldsList = (0, import_utils6.orderSelectedFields)(this.config.fields);
      const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), fieldsList, "all", true, undefined, {
        type: "select",
        tables: [...this.usedTables]
      }, this.cacheConfig);
      query.joinsNotNullableMap = this.joinsNotNullableMap;
      return query;
    }
    $withCache(config) {
      this.cacheConfig = config === undefined ? { config: {}, enable: true, autoInvalidate: true } : config === false ? { enable: false } : { enable: true, autoInvalidate: true, ...config };
      return this;
    }
    prepare() {
      return this._prepare(false);
    }
    run = (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    };
    async execute() {
      return this.all();
    }
  }
  (0, import_utils6.applyMixins)(SQLiteSelectBase, [import_query_promise.QueryPromise]);
  function createSetOperator(type, isAll) {
    return (leftSelect, rightSelect, ...restSelects) => {
      const setOperators = [rightSelect, ...restSelects].map((select) => ({
        type,
        isAll,
        rightSelect: select
      }));
      for (const setOperator of setOperators) {
        if (!(0, import_utils6.haveSameKeys)(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
          throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
        }
      }
      return leftSelect.addSetOperators(setOperators);
    };
  }
  var getSQLiteSetOperators = () => ({
    union,
    unionAll,
    intersect,
    except
  });
  var union = createSetOperator("union", false);
  var unionAll = createSetOperator("union", true);
  var intersect = createSetOperator("intersect", false);
  var except = createSetOperator("except", false);
});

// node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.cjs
var require_query_builder2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var query_builder_exports = {};
  __export2(query_builder_exports, {
    QueryBuilder: () => QueryBuilder
  });
  module.exports = __toCommonJS(query_builder_exports);
  var import_entity18 = require_entity();
  var import_selection_proxy = require_selection_proxy();
  var import_dialect = require_dialect();
  var import_subquery2 = require_subquery();
  var import_select = require_select2();

  class QueryBuilder {
    static [import_entity18.entityKind] = "SQLiteQueryBuilder";
    dialect;
    dialectConfig;
    constructor(dialect) {
      this.dialect = (0, import_entity18.is)(dialect, import_dialect.SQLiteDialect) ? dialect : undefined;
      this.dialectConfig = (0, import_entity18.is)(dialect, import_dialect.SQLiteDialect) ? undefined : dialect;
    }
    $with = (alias, selection) => {
      const queryBuilder = this;
      const as = (qb) => {
        if (typeof qb === "function") {
          qb = qb(queryBuilder);
        }
        return new Proxy(new import_subquery2.WithSubquery(qb.getSQL(), selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}), alias, true), new import_selection_proxy.SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      };
      return { as };
    };
    with(...queries) {
      const self = this;
      function select(fields) {
        return new import_select.SQLiteSelectBuilder({
          fields: fields ?? undefined,
          session: undefined,
          dialect: self.getDialect(),
          withList: queries
        });
      }
      function selectDistinct(fields) {
        return new import_select.SQLiteSelectBuilder({
          fields: fields ?? undefined,
          session: undefined,
          dialect: self.getDialect(),
          withList: queries,
          distinct: true
        });
      }
      return { select, selectDistinct };
    }
    select(fields) {
      return new import_select.SQLiteSelectBuilder({ fields: fields ?? undefined, session: undefined, dialect: this.getDialect() });
    }
    selectDistinct(fields) {
      return new import_select.SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: this.getDialect(),
        distinct: true
      });
    }
    getDialect() {
      if (!this.dialect) {
        this.dialect = new import_dialect.SQLiteSyncDialect(this.dialectConfig);
      }
      return this.dialect;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/insert.cjs
var require_insert = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var insert_exports = {};
  __export2(insert_exports, {
    SQLiteInsertBase: () => SQLiteInsertBase,
    SQLiteInsertBuilder: () => SQLiteInsertBuilder
  });
  module.exports = __toCommonJS(insert_exports);
  var import_entity18 = require_entity();
  var import_query_promise = require_query_promise();
  var import_sql2 = require_sql();
  var import_table3 = require_table3();
  var import_table22 = require_table();
  var import_utils6 = require_utils();
  var import_utils22 = require_utils3();
  var import_query_builder = require_query_builder2();

  class SQLiteInsertBuilder {
    constructor(table, session, dialect, withList) {
      this.table = table;
      this.session = session;
      this.dialect = dialect;
      this.withList = withList;
    }
    static [import_entity18.entityKind] = "SQLiteInsertBuilder";
    values(values) {
      values = Array.isArray(values) ? values : [values];
      if (values.length === 0) {
        throw new Error("values() must be called with at least one value");
      }
      const mappedValues = values.map((entry) => {
        const result = {};
        const cols = this.table[import_table22.Table.Symbol.Columns];
        for (const colKey of Object.keys(entry)) {
          const colValue = entry[colKey];
          result[colKey] = (0, import_entity18.is)(colValue, import_sql2.SQL) ? colValue : new import_sql2.Param(colValue, cols[colKey]);
        }
        return result;
      });
      return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
    }
    select(selectQuery) {
      const select = typeof selectQuery === "function" ? selectQuery(new import_query_builder.QueryBuilder) : selectQuery;
      if (!(0, import_entity18.is)(select, import_sql2.SQL) && !(0, import_utils6.haveSameKeys)(this.table[import_table22.Columns], select._.selectedFields)) {
        throw new Error("Insert select error: selected fields are not the same or are in a different order compared to the table definition");
      }
      return new SQLiteInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
    }
  }

  class SQLiteInsertBase extends import_query_promise.QueryPromise {
    constructor(table, values, session, dialect, withList, select) {
      super();
      this.session = session;
      this.dialect = dialect;
      this.config = { table, values, withList, select };
    }
    static [import_entity18.entityKind] = "SQLiteInsert";
    config;
    returning(fields = this.config.table[import_table3.SQLiteTable.Symbol.Columns]) {
      this.config.returning = (0, import_utils6.orderSelectedFields)(fields);
      return this;
    }
    onConflictDoNothing(config = {}) {
      if (!this.config.onConflict)
        this.config.onConflict = [];
      if (config.target === undefined) {
        this.config.onConflict.push(import_sql2.sql` on conflict do nothing`);
      } else {
        const targetSql = Array.isArray(config.target) ? import_sql2.sql`${config.target}` : import_sql2.sql`${[config.target]}`;
        const whereSql = config.where ? import_sql2.sql` where ${config.where}` : import_sql2.sql``;
        this.config.onConflict.push(import_sql2.sql` on conflict ${targetSql} do nothing${whereSql}`);
      }
      return this;
    }
    onConflictDoUpdate(config) {
      if (config.where && (config.targetWhere || config.setWhere)) {
        throw new Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
      }
      if (!this.config.onConflict)
        this.config.onConflict = [];
      const whereSql = config.where ? import_sql2.sql` where ${config.where}` : undefined;
      const targetWhereSql = config.targetWhere ? import_sql2.sql` where ${config.targetWhere}` : undefined;
      const setWhereSql = config.setWhere ? import_sql2.sql` where ${config.setWhere}` : undefined;
      const targetSql = Array.isArray(config.target) ? import_sql2.sql`${config.target}` : import_sql2.sql`${[config.target]}`;
      const setSql = this.dialect.buildUpdateSet(this.config.table, (0, import_utils6.mapUpdateSet)(this.config.table, config.set));
      this.config.onConflict.push(import_sql2.sql` on conflict ${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`);
      return this;
    }
    getSQL() {
      return this.dialect.buildInsertQuery(this.config);
    }
    toSQL() {
      const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
      return rest;
    }
    _prepare(isOneTimeQuery = true) {
      return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, undefined, {
        type: "insert",
        tables: (0, import_utils22.extractUsedTable)(this.config.table)
      });
    }
    prepare() {
      return this._prepare(false);
    }
    run = (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    };
    async execute() {
      return this.config.returning ? this.all() : this.run();
    }
    $dynamic() {
      return this;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/select.types.cjs
var require_select_types = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var select_types_exports = {};
  module.exports = __toCommonJS(select_types_exports);
});

// node_modules/drizzle-orm/sqlite-core/query-builders/update.cjs
var require_update = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var update_exports = {};
  __export2(update_exports, {
    SQLiteUpdateBase: () => SQLiteUpdateBase,
    SQLiteUpdateBuilder: () => SQLiteUpdateBuilder
  });
  module.exports = __toCommonJS(update_exports);
  var import_entity18 = require_entity();
  var import_query_promise = require_query_promise();
  var import_selection_proxy = require_selection_proxy();
  var import_table3 = require_table3();
  var import_subquery2 = require_subquery();
  var import_table22 = require_table();
  var import_utils6 = require_utils();
  var import_view_common2 = require_view_common();
  var import_utils22 = require_utils3();
  var import_view_base = require_view_base();

  class SQLiteUpdateBuilder {
    constructor(table, session, dialect, withList) {
      this.table = table;
      this.session = session;
      this.dialect = dialect;
      this.withList = withList;
    }
    static [import_entity18.entityKind] = "SQLiteUpdateBuilder";
    set(values) {
      return new SQLiteUpdateBase(this.table, (0, import_utils6.mapUpdateSet)(this.table, values), this.session, this.dialect, this.withList);
    }
  }

  class SQLiteUpdateBase extends import_query_promise.QueryPromise {
    constructor(table, set, session, dialect, withList) {
      super();
      this.session = session;
      this.dialect = dialect;
      this.config = { set, table, withList, joins: [] };
    }
    static [import_entity18.entityKind] = "SQLiteUpdate";
    config;
    from(source) {
      this.config.from = source;
      return this;
    }
    createJoin(joinType) {
      return (table, on) => {
        const tableName = (0, import_utils6.getTableLikeName)(table);
        if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) {
          throw new Error(`Alias "${tableName}" is already used in this query`);
        }
        if (typeof on === "function") {
          const from = this.config.from ? (0, import_entity18.is)(table, import_table3.SQLiteTable) ? table[import_table22.Table.Symbol.Columns] : (0, import_entity18.is)(table, import_subquery2.Subquery) ? table._.selectedFields : (0, import_entity18.is)(table, import_view_base.SQLiteViewBase) ? table[import_view_common2.ViewBaseConfig].selectedFields : undefined : undefined;
          on = on(new Proxy(this.config.table[import_table22.Table.Symbol.Columns], new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })), from && new Proxy(from, new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
        }
        this.config.joins.push({ on, table, joinType, alias: tableName });
        return this;
      };
    }
    leftJoin = this.createJoin("left");
    rightJoin = this.createJoin("right");
    innerJoin = this.createJoin("inner");
    fullJoin = this.createJoin("full");
    where(where) {
      this.config.where = where;
      return this;
    }
    orderBy(...columns) {
      if (typeof columns[0] === "function") {
        const orderBy = columns[0](new Proxy(this.config.table[import_table22.Table.Symbol.Columns], new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
        const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
        this.config.orderBy = orderByArray;
      } else {
        const orderByArray = columns;
        this.config.orderBy = orderByArray;
      }
      return this;
    }
    limit(limit) {
      this.config.limit = limit;
      return this;
    }
    returning(fields = this.config.table[import_table3.SQLiteTable.Symbol.Columns]) {
      this.config.returning = (0, import_utils6.orderSelectedFields)(fields);
      return this;
    }
    getSQL() {
      return this.dialect.buildUpdateQuery(this.config);
    }
    toSQL() {
      const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
      return rest;
    }
    _prepare(isOneTimeQuery = true) {
      return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, undefined, {
        type: "insert",
        tables: (0, import_utils22.extractUsedTable)(this.config.table)
      });
    }
    prepare() {
      return this._prepare(false);
    }
    run = (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    };
    all = (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    };
    get = (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    };
    values = (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    };
    async execute() {
      return this.config.returning ? this.all() : this.run();
    }
    $dynamic() {
      return this;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/index.cjs
var require_query_builders = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var query_builders_exports = {};
  module.exports = __toCommonJS(query_builders_exports);
  __reExport(query_builders_exports, require_delete(), module.exports);
  __reExport(query_builders_exports, require_insert(), module.exports);
  __reExport(query_builders_exports, require_query_builder2(), module.exports);
  __reExport(query_builders_exports, require_select2(), module.exports);
  __reExport(query_builders_exports, require_select_types(), module.exports);
  __reExport(query_builders_exports, require_update(), module.exports);
});

// node_modules/drizzle-orm/sqlite-core/query-builders/count.cjs
var require_count = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var count_exports = {};
  __export2(count_exports, {
    SQLiteCountBuilder: () => SQLiteCountBuilder
  });
  module.exports = __toCommonJS(count_exports);
  var import_entity18 = require_entity();
  var import_sql2 = require_sql();

  class SQLiteCountBuilder extends import_sql2.SQL {
    constructor(params) {
      super(SQLiteCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
      this.params = params;
      this.session = params.session;
      this.sql = SQLiteCountBuilder.buildCount(params.source, params.filters);
    }
    sql;
    static [import_entity18.entityKind] = "SQLiteCountBuilderAsync";
    [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
    session;
    static buildEmbeddedCount(source, filters) {
      return import_sql2.sql`(select count(*) from ${source}${import_sql2.sql.raw(" where ").if(filters)}${filters})`;
    }
    static buildCount(source, filters) {
      return import_sql2.sql`select count(*) from ${source}${import_sql2.sql.raw(" where ").if(filters)}${filters}`;
    }
    then(onfulfilled, onrejected) {
      return Promise.resolve(this.session.count(this.sql)).then(onfulfilled, onrejected);
    }
    catch(onRejected) {
      return this.then(undefined, onRejected);
    }
    finally(onFinally) {
      return this.then((value) => {
        onFinally?.();
        return value;
      }, (reason) => {
        onFinally?.();
        throw reason;
      });
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/query.cjs
var require_query = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var query_exports = {};
  __export2(query_exports, {
    RelationalQueryBuilder: () => RelationalQueryBuilder,
    SQLiteRelationalQuery: () => SQLiteRelationalQuery,
    SQLiteSyncRelationalQuery: () => SQLiteSyncRelationalQuery
  });
  module.exports = __toCommonJS(query_exports);
  var import_entity18 = require_entity();
  var import_query_promise = require_query_promise();
  var import_relations = require_relations();

  class RelationalQueryBuilder {
    constructor(mode, fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
      this.mode = mode;
      this.fullSchema = fullSchema;
      this.schema = schema;
      this.tableNamesMap = tableNamesMap;
      this.table = table;
      this.tableConfig = tableConfig;
      this.dialect = dialect;
      this.session = session;
    }
    static [import_entity18.entityKind] = "SQLiteAsyncRelationalQueryBuilder";
    findMany(config) {
      return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
    }
    findFirst(config) {
      return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first");
    }
  }

  class SQLiteRelationalQuery extends import_query_promise.QueryPromise {
    constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
      super();
      this.fullSchema = fullSchema;
      this.schema = schema;
      this.tableNamesMap = tableNamesMap;
      this.table = table;
      this.tableConfig = tableConfig;
      this.dialect = dialect;
      this.session = session;
      this.config = config;
      this.mode = mode;
    }
    static [import_entity18.entityKind] = "SQLiteAsyncRelationalQuery";
    mode;
    getSQL() {
      return this.dialect.buildRelationalQuery({
        fullSchema: this.fullSchema,
        schema: this.schema,
        tableNamesMap: this.tableNamesMap,
        table: this.table,
        tableConfig: this.tableConfig,
        queryConfig: this.config,
        tableAlias: this.tableConfig.tsName
      }).sql;
    }
    _prepare(isOneTimeQuery = false) {
      const { query, builtQuery } = this._toSQL();
      return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](builtQuery, undefined, this.mode === "first" ? "get" : "all", true, (rawRows, mapColumnValue) => {
        const rows = rawRows.map((row) => (0, import_relations.mapRelationalRow)(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
        if (this.mode === "first") {
          return rows[0];
        }
        return rows;
      });
    }
    prepare() {
      return this._prepare(false);
    }
    _toSQL() {
      const query = this.dialect.buildRelationalQuery({
        fullSchema: this.fullSchema,
        schema: this.schema,
        tableNamesMap: this.tableNamesMap,
        table: this.table,
        tableConfig: this.tableConfig,
        queryConfig: this.config,
        tableAlias: this.tableConfig.tsName
      });
      const builtQuery = this.dialect.sqlToQuery(query.sql);
      return { query, builtQuery };
    }
    toSQL() {
      return this._toSQL().builtQuery;
    }
    executeRaw() {
      if (this.mode === "first") {
        return this._prepare(false).get();
      }
      return this._prepare(false).all();
    }
    async execute() {
      return this.executeRaw();
    }
  }

  class SQLiteSyncRelationalQuery extends SQLiteRelationalQuery {
    static [import_entity18.entityKind] = "SQLiteSyncRelationalQuery";
    sync() {
      return this.executeRaw();
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/query-builders/raw.cjs
var require_raw = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var raw_exports = {};
  __export2(raw_exports, {
    SQLiteRaw: () => SQLiteRaw
  });
  module.exports = __toCommonJS(raw_exports);
  var import_entity18 = require_entity();
  var import_query_promise = require_query_promise();

  class SQLiteRaw extends import_query_promise.QueryPromise {
    constructor(execute, getSQL, action, dialect, mapBatchResult) {
      super();
      this.execute = execute;
      this.getSQL = getSQL;
      this.dialect = dialect;
      this.mapBatchResult = mapBatchResult;
      this.config = { action };
    }
    static [import_entity18.entityKind] = "SQLiteRaw";
    config;
    getQuery() {
      return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
    }
    mapResult(result, isFromBatch) {
      return isFromBatch ? this.mapBatchResult(result) : result;
    }
    _prepare() {
      return this;
    }
    isResponseInArrayMode() {
      return false;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/db.cjs
var require_db = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var db_exports = {};
  __export2(db_exports, {
    BaseSQLiteDatabase: () => BaseSQLiteDatabase,
    withReplicas: () => withReplicas
  });
  module.exports = __toCommonJS(db_exports);
  var import_entity18 = require_entity();
  var import_selection_proxy = require_selection_proxy();
  var import_sql2 = require_sql();
  var import_query_builders = require_query_builders();
  var import_subquery2 = require_subquery();
  var import_count = require_count();
  var import_query = require_query();
  var import_raw = require_raw();

  class BaseSQLiteDatabase {
    constructor(resultKind, dialect, session, schema) {
      this.resultKind = resultKind;
      this.dialect = dialect;
      this.session = session;
      this._ = schema ? {
        schema: schema.schema,
        fullSchema: schema.fullSchema,
        tableNamesMap: schema.tableNamesMap
      } : {
        schema: undefined,
        fullSchema: {},
        tableNamesMap: {}
      };
      this.query = {};
      const query = this.query;
      if (this._.schema) {
        for (const [tableName, columns] of Object.entries(this._.schema)) {
          query[tableName] = new import_query.RelationalQueryBuilder(resultKind, schema.fullSchema, this._.schema, this._.tableNamesMap, schema.fullSchema[tableName], columns, dialect, session);
        }
      }
      this.$cache = { invalidate: async (_params) => {} };
    }
    static [import_entity18.entityKind] = "BaseSQLiteDatabase";
    query;
    $with = (alias, selection) => {
      const self = this;
      const as = (qb) => {
        if (typeof qb === "function") {
          qb = qb(new import_query_builders.QueryBuilder(self.dialect));
        }
        return new Proxy(new import_subquery2.WithSubquery(qb.getSQL(), selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}), alias, true), new import_selection_proxy.SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      };
      return { as };
    };
    $count(source, filters) {
      return new import_count.SQLiteCountBuilder({ source, filters, session: this.session });
    }
    with(...queries) {
      const self = this;
      function select(fields) {
        return new import_query_builders.SQLiteSelectBuilder({
          fields: fields ?? undefined,
          session: self.session,
          dialect: self.dialect,
          withList: queries
        });
      }
      function selectDistinct(fields) {
        return new import_query_builders.SQLiteSelectBuilder({
          fields: fields ?? undefined,
          session: self.session,
          dialect: self.dialect,
          withList: queries,
          distinct: true
        });
      }
      function update(table) {
        return new import_query_builders.SQLiteUpdateBuilder(table, self.session, self.dialect, queries);
      }
      function insert(into) {
        return new import_query_builders.SQLiteInsertBuilder(into, self.session, self.dialect, queries);
      }
      function delete_(from) {
        return new import_query_builders.SQLiteDeleteBase(from, self.session, self.dialect, queries);
      }
      return { select, selectDistinct, update, insert, delete: delete_ };
    }
    select(fields) {
      return new import_query_builders.SQLiteSelectBuilder({ fields: fields ?? undefined, session: this.session, dialect: this.dialect });
    }
    selectDistinct(fields) {
      return new import_query_builders.SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: this.session,
        dialect: this.dialect,
        distinct: true
      });
    }
    update(table) {
      return new import_query_builders.SQLiteUpdateBuilder(table, this.session, this.dialect);
    }
    $cache;
    insert(into) {
      return new import_query_builders.SQLiteInsertBuilder(into, this.session, this.dialect);
    }
    delete(from) {
      return new import_query_builders.SQLiteDeleteBase(from, this.session, this.dialect);
    }
    run(query) {
      const sequel = typeof query === "string" ? import_sql2.sql.raw(query) : query.getSQL();
      if (this.resultKind === "async") {
        return new import_raw.SQLiteRaw(async () => this.session.run(sequel), () => sequel, "run", this.dialect, this.session.extractRawRunValueFromBatchResult.bind(this.session));
      }
      return this.session.run(sequel);
    }
    all(query) {
      const sequel = typeof query === "string" ? import_sql2.sql.raw(query) : query.getSQL();
      if (this.resultKind === "async") {
        return new import_raw.SQLiteRaw(async () => this.session.all(sequel), () => sequel, "all", this.dialect, this.session.extractRawAllValueFromBatchResult.bind(this.session));
      }
      return this.session.all(sequel);
    }
    get(query) {
      const sequel = typeof query === "string" ? import_sql2.sql.raw(query) : query.getSQL();
      if (this.resultKind === "async") {
        return new import_raw.SQLiteRaw(async () => this.session.get(sequel), () => sequel, "get", this.dialect, this.session.extractRawGetValueFromBatchResult.bind(this.session));
      }
      return this.session.get(sequel);
    }
    values(query) {
      const sequel = typeof query === "string" ? import_sql2.sql.raw(query) : query.getSQL();
      if (this.resultKind === "async") {
        return new import_raw.SQLiteRaw(async () => this.session.values(sequel), () => sequel, "values", this.dialect, this.session.extractRawValuesValueFromBatchResult.bind(this.session));
      }
      return this.session.values(sequel);
    }
    transaction(transaction, config) {
      return this.session.transaction(transaction, config);
    }
  }
  var withReplicas = (primary, replicas, getReplica = () => replicas[Math.floor(Math.random() * replicas.length)]) => {
    const select = (...args) => getReplica(replicas).select(...args);
    const selectDistinct = (...args) => getReplica(replicas).selectDistinct(...args);
    const $count = (...args) => getReplica(replicas).$count(...args);
    const $with = (...args) => getReplica(replicas).with(...args);
    const update = (...args) => primary.update(...args);
    const insert = (...args) => primary.insert(...args);
    const $delete = (...args) => primary.delete(...args);
    const run = (...args) => primary.run(...args);
    const all = (...args) => primary.all(...args);
    const get = (...args) => primary.get(...args);
    const values = (...args) => primary.values(...args);
    const transaction = (...args) => primary.transaction(...args);
    return {
      ...primary,
      update,
      insert,
      delete: $delete,
      run,
      all,
      get,
      values,
      transaction,
      $primary: primary,
      $replicas: replicas,
      select,
      selectDistinct,
      $count,
      with: $with,
      get query() {
        return getReplica(replicas).query;
      }
    };
  };
});

// node_modules/drizzle-orm/cache/core/cache.cjs
var require_cache = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var cache_exports = {};
  __export2(cache_exports, {
    Cache: () => Cache,
    NoopCache: () => NoopCache,
    hashQuery: () => hashQuery
  });
  module.exports = __toCommonJS(cache_exports);
  var import_entity18 = require_entity();

  class Cache {
    static [import_entity18.entityKind] = "Cache";
  }

  class NoopCache extends Cache {
    strategy() {
      return "all";
    }
    static [import_entity18.entityKind] = "NoopCache";
    async get(_key) {
      return;
    }
    async put(_hashedQuery, _response, _tables, _config) {}
    async onMutate(_params) {}
  }
  async function hashQuery(sql2, params) {
    const dataToHash = `${sql2}-${JSON.stringify(params)}`;
    const encoder = new TextEncoder;
    const data = encoder.encode(dataToHash);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = [...new Uint8Array(hashBuffer)];
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }
});

// node_modules/drizzle-orm/cache/core/index.cjs
var require_core = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var core_exports = {};
  module.exports = __toCommonJS(core_exports);
  __reExport(core_exports, require_cache(), module.exports);
});

// node_modules/drizzle-orm/sqlite-core/alias.cjs
var require_alias2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var alias_exports = {};
  __export2(alias_exports, {
    alias: () => alias
  });
  module.exports = __toCommonJS(alias_exports);
  var import_alias = require_alias();
  function alias(table, alias2) {
    return new Proxy(table, new import_alias.TableAliasProxyHandler(alias2, false));
  }
});

// node_modules/drizzle-orm/sqlite-core/session.cjs
var require_session = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var session_exports = {};
  __export2(session_exports, {
    ExecuteResultSync: () => ExecuteResultSync,
    SQLitePreparedQuery: () => SQLitePreparedQuery,
    SQLiteSession: () => SQLiteSession,
    SQLiteTransaction: () => SQLiteTransaction
  });
  module.exports = __toCommonJS(session_exports);
  var import_cache = require_cache();
  var import_entity18 = require_entity();
  var import_errors = require_errors();
  var import_query_promise = require_query_promise();
  var import_db = require_db();

  class ExecuteResultSync extends import_query_promise.QueryPromise {
    constructor(resultCb) {
      super();
      this.resultCb = resultCb;
    }
    static [import_entity18.entityKind] = "ExecuteResultSync";
    async execute() {
      return this.resultCb();
    }
    sync() {
      return this.resultCb();
    }
  }

  class SQLitePreparedQuery {
    constructor(mode, executeMethod, query, cache, queryMetadata, cacheConfig) {
      this.mode = mode;
      this.executeMethod = executeMethod;
      this.query = query;
      this.cache = cache;
      this.queryMetadata = queryMetadata;
      this.cacheConfig = cacheConfig;
      if (cache && cache.strategy() === "all" && cacheConfig === undefined) {
        this.cacheConfig = { enable: true, autoInvalidate: true };
      }
      if (!this.cacheConfig?.enable) {
        this.cacheConfig = undefined;
      }
    }
    static [import_entity18.entityKind] = "PreparedQuery";
    joinsNotNullableMap;
    async queryWithCache(queryString, params, query) {
      if (this.cache === undefined || (0, import_entity18.is)(this.cache, import_cache.NoopCache) || this.queryMetadata === undefined) {
        try {
          return await query();
        } catch (e) {
          throw new import_errors.DrizzleQueryError(queryString, params, e);
        }
      }
      if (this.cacheConfig && !this.cacheConfig.enable) {
        try {
          return await query();
        } catch (e) {
          throw new import_errors.DrizzleQueryError(queryString, params, e);
        }
      }
      if ((this.queryMetadata.type === "insert" || this.queryMetadata.type === "update" || this.queryMetadata.type === "delete") && this.queryMetadata.tables.length > 0) {
        try {
          const [res] = await Promise.all([
            query(),
            this.cache.onMutate({ tables: this.queryMetadata.tables })
          ]);
          return res;
        } catch (e) {
          throw new import_errors.DrizzleQueryError(queryString, params, e);
        }
      }
      if (!this.cacheConfig) {
        try {
          return await query();
        } catch (e) {
          throw new import_errors.DrizzleQueryError(queryString, params, e);
        }
      }
      if (this.queryMetadata.type === "select") {
        const fromCache = await this.cache.get(this.cacheConfig.tag ?? await (0, import_cache.hashQuery)(queryString, params), this.queryMetadata.tables, this.cacheConfig.tag !== undefined, this.cacheConfig.autoInvalidate);
        if (fromCache === undefined) {
          let result;
          try {
            result = await query();
          } catch (e) {
            throw new import_errors.DrizzleQueryError(queryString, params, e);
          }
          await this.cache.put(this.cacheConfig.tag ?? await (0, import_cache.hashQuery)(queryString, params), result, this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [], this.cacheConfig.tag !== undefined, this.cacheConfig.config);
          return result;
        }
        return fromCache;
      }
      try {
        return await query();
      } catch (e) {
        throw new import_errors.DrizzleQueryError(queryString, params, e);
      }
    }
    getQuery() {
      return this.query;
    }
    mapRunResult(result, _isFromBatch) {
      return result;
    }
    mapAllResult(_result, _isFromBatch) {
      throw new Error("Not implemented");
    }
    mapGetResult(_result, _isFromBatch) {
      throw new Error("Not implemented");
    }
    execute(placeholderValues) {
      if (this.mode === "async") {
        return this[this.executeMethod](placeholderValues);
      }
      return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
    }
    mapResult(response, isFromBatch) {
      switch (this.executeMethod) {
        case "run": {
          return this.mapRunResult(response, isFromBatch);
        }
        case "all": {
          return this.mapAllResult(response, isFromBatch);
        }
        case "get": {
          return this.mapGetResult(response, isFromBatch);
        }
      }
    }
  }

  class SQLiteSession {
    constructor(dialect) {
      this.dialect = dialect;
    }
    static [import_entity18.entityKind] = "SQLiteSession";
    prepareOneTimeQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
      return this.prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig);
    }
    run(query) {
      const staticQuery = this.dialect.sqlToQuery(query);
      try {
        return this.prepareOneTimeQuery(staticQuery, undefined, "run", false).run();
      } catch (err) {
        throw new import_errors.DrizzleError({ cause: err, message: `Failed to run the query '${staticQuery.sql}'` });
      }
    }
    extractRawRunValueFromBatchResult(result) {
      return result;
    }
    all(query) {
      return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), undefined, "run", false).all();
    }
    extractRawAllValueFromBatchResult(_result) {
      throw new Error("Not implemented");
    }
    get(query) {
      return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), undefined, "run", false).get();
    }
    extractRawGetValueFromBatchResult(_result) {
      throw new Error("Not implemented");
    }
    values(query) {
      return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), undefined, "run", false).values();
    }
    async count(sql2) {
      const result = await this.values(sql2);
      return result[0][0];
    }
    extractRawValuesValueFromBatchResult(_result) {
      throw new Error("Not implemented");
    }
  }

  class SQLiteTransaction extends import_db.BaseSQLiteDatabase {
    constructor(resultType, dialect, session, schema, nestedIndex = 0) {
      super(resultType, dialect, session, schema);
      this.schema = schema;
      this.nestedIndex = nestedIndex;
    }
    static [import_entity18.entityKind] = "SQLiteTransaction";
    rollback() {
      throw new import_errors.TransactionRollbackError;
    }
  }
});

// node_modules/drizzle-orm/sqlite-core/subquery.cjs
var require_subquery2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var subquery_exports = {};
  module.exports = __toCommonJS(subquery_exports);
});

// node_modules/drizzle-orm/sqlite-core/view.cjs
var require_view = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var view_exports = {};
  __export2(view_exports, {
    ManualViewBuilder: () => ManualViewBuilder,
    SQLiteView: () => SQLiteView,
    ViewBuilder: () => ViewBuilder,
    ViewBuilderCore: () => ViewBuilderCore,
    sqliteView: () => sqliteView,
    view: () => view
  });
  module.exports = __toCommonJS(view_exports);
  var import_entity18 = require_entity();
  var import_selection_proxy = require_selection_proxy();
  var import_utils6 = require_utils();
  var import_query_builder = require_query_builder2();
  var import_table3 = require_table3();
  var import_view_base = require_view_base();

  class ViewBuilderCore {
    constructor(name) {
      this.name = name;
    }
    static [import_entity18.entityKind] = "SQLiteViewBuilderCore";
    config = {};
  }

  class ViewBuilder extends ViewBuilderCore {
    static [import_entity18.entityKind] = "SQLiteViewBuilder";
    as(qb) {
      if (typeof qb === "function") {
        qb = qb(new import_query_builder.QueryBuilder);
      }
      const selectionProxy = new import_selection_proxy.SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: "error",
        sqlAliasedBehavior: "alias",
        replaceOriginalName: true
      });
      const aliasedSelectedFields = qb.getSelectedFields();
      return new Proxy(new SQLiteView({
        config: {
          name: this.name,
          schema: undefined,
          selectedFields: aliasedSelectedFields,
          query: qb.getSQL().inlineParams()
        }
      }), selectionProxy);
    }
  }

  class ManualViewBuilder extends ViewBuilderCore {
    static [import_entity18.entityKind] = "SQLiteManualViewBuilder";
    columns;
    constructor(name, columns) {
      super(name);
      this.columns = (0, import_utils6.getTableColumns)((0, import_table3.sqliteTable)(name, columns));
    }
    existing() {
      return new Proxy(new SQLiteView({
        config: {
          name: this.name,
          schema: undefined,
          selectedFields: this.columns,
          query: undefined
        }
      }), new import_selection_proxy.SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: "error",
        sqlAliasedBehavior: "alias",
        replaceOriginalName: true
      }));
    }
    as(query) {
      return new Proxy(new SQLiteView({
        config: {
          name: this.name,
          schema: undefined,
          selectedFields: this.columns,
          query: query.inlineParams()
        }
      }), new import_selection_proxy.SelectionProxyHandler({
        alias: this.name,
        sqlBehavior: "error",
        sqlAliasedBehavior: "alias",
        replaceOriginalName: true
      }));
    }
  }

  class SQLiteView extends import_view_base.SQLiteViewBase {
    static [import_entity18.entityKind] = "SQLiteView";
    constructor({ config }) {
      super(config);
    }
  }
  function sqliteView(name, selection) {
    if (selection) {
      return new ManualViewBuilder(name, selection);
    }
    return new ViewBuilder(name);
  }
  var view = sqliteView;
});

// node_modules/drizzle-orm/sqlite-core/index.cjs
var require_sqlite_core = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var sqlite_core_exports = {};
  module.exports = __toCommonJS(sqlite_core_exports);
  __reExport(sqlite_core_exports, require_alias2(), module.exports);
  __reExport(sqlite_core_exports, require_checks(), module.exports);
  __reExport(sqlite_core_exports, require_columns(), module.exports);
  __reExport(sqlite_core_exports, require_db(), module.exports);
  __reExport(sqlite_core_exports, require_dialect(), module.exports);
  __reExport(sqlite_core_exports, require_foreign_keys2(), module.exports);
  __reExport(sqlite_core_exports, require_indexes(), module.exports);
  __reExport(sqlite_core_exports, require_primary_keys2(), module.exports);
  __reExport(sqlite_core_exports, require_query_builders(), module.exports);
  __reExport(sqlite_core_exports, require_session(), module.exports);
  __reExport(sqlite_core_exports, require_subquery2(), module.exports);
  __reExport(sqlite_core_exports, require_table3(), module.exports);
  __reExport(sqlite_core_exports, require_unique_constraint2(), module.exports);
  __reExport(sqlite_core_exports, require_utils3(), module.exports);
  __reExport(sqlite_core_exports, require_view(), module.exports);
});

// node_modules/drizzle-orm/sqlite-proxy/session.cjs
var require_session2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var session_exports = {};
  __export2(session_exports, {
    RemotePreparedQuery: () => RemotePreparedQuery,
    SQLiteProxyTransaction: () => SQLiteProxyTransaction,
    SQLiteRemoteSession: () => SQLiteRemoteSession
  });
  module.exports = __toCommonJS(session_exports);
  var import_core = require_core();
  var import_entity18 = require_entity();
  var import_logger = require_logger();
  var import_sql2 = require_sql();
  var import_sqlite_core2 = require_sqlite_core();
  var import_session = require_session();
  var import_utils6 = require_utils();

  class SQLiteRemoteSession extends import_session.SQLiteSession {
    constructor(client, dialect, schema, batchCLient, options = {}) {
      super(dialect);
      this.client = client;
      this.schema = schema;
      this.batchCLient = batchCLient;
      this.logger = options.logger ?? new import_logger.NoopLogger;
      this.cache = options.cache ?? new import_core.NoopCache;
    }
    static [import_entity18.entityKind] = "SQLiteRemoteSession";
    logger;
    cache;
    prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
      return new RemotePreparedQuery(this.client, query, this.logger, this.cache, queryMetadata, cacheConfig, fields, executeMethod, isResponseInArrayMode, customResultMapper);
    }
    async batch(queries) {
      const preparedQueries = [];
      const builtQueries = [];
      for (const query of queries) {
        const preparedQuery = query._prepare();
        const builtQuery = preparedQuery.getQuery();
        preparedQueries.push(preparedQuery);
        builtQueries.push({ sql: builtQuery.sql, params: builtQuery.params, method: builtQuery.method });
      }
      const batchResults = await this.batchCLient(builtQueries);
      return batchResults.map((result, i) => preparedQueries[i].mapResult(result, true));
    }
    async transaction(transaction, config) {
      const tx = new SQLiteProxyTransaction("async", this.dialect, this, this.schema);
      await this.run(import_sql2.sql.raw(`begin${config?.behavior ? " " + config.behavior : ""}`));
      try {
        const result = await transaction(tx);
        await this.run(import_sql2.sql`commit`);
        return result;
      } catch (err) {
        await this.run(import_sql2.sql`rollback`);
        throw err;
      }
    }
    extractRawAllValueFromBatchResult(result) {
      return result.rows;
    }
    extractRawGetValueFromBatchResult(result) {
      return result.rows[0];
    }
    extractRawValuesValueFromBatchResult(result) {
      return result.rows;
    }
  }

  class SQLiteProxyTransaction extends import_sqlite_core2.SQLiteTransaction {
    static [import_entity18.entityKind] = "SQLiteProxyTransaction";
    async transaction(transaction) {
      const savepointName = `sp${this.nestedIndex}`;
      const tx = new SQLiteProxyTransaction("async", this.dialect, this.session, this.schema, this.nestedIndex + 1);
      await this.session.run(import_sql2.sql.raw(`savepoint ${savepointName}`));
      try {
        const result = await transaction(tx);
        await this.session.run(import_sql2.sql.raw(`release savepoint ${savepointName}`));
        return result;
      } catch (err) {
        await this.session.run(import_sql2.sql.raw(`rollback to savepoint ${savepointName}`));
        throw err;
      }
    }
  }

  class RemotePreparedQuery extends import_session.SQLitePreparedQuery {
    constructor(client, query, logger, cache, queryMetadata, cacheConfig, fields, executeMethod, _isResponseInArrayMode, customResultMapper) {
      super("async", executeMethod, query, cache, queryMetadata, cacheConfig);
      this.client = client;
      this.logger = logger;
      this.fields = fields;
      this._isResponseInArrayMode = _isResponseInArrayMode;
      this.customResultMapper = customResultMapper;
      this.customResultMapper = customResultMapper;
      this.method = executeMethod;
    }
    static [import_entity18.entityKind] = "SQLiteProxyPreparedQuery";
    method;
    getQuery() {
      return { ...this.query, method: this.method };
    }
    async run(placeholderValues) {
      const params = (0, import_sql2.fillPlaceholders)(this.query.params, placeholderValues ?? {});
      this.logger.logQuery(this.query.sql, params);
      return await this.queryWithCache(this.query.sql, params, async () => {
        return await this.client(this.query.sql, params, "run");
      });
    }
    mapAllResult(rows, isFromBatch) {
      if (isFromBatch) {
        rows = rows.rows;
      }
      if (!this.fields && !this.customResultMapper) {
        return rows;
      }
      if (this.customResultMapper) {
        return this.customResultMapper(rows);
      }
      return rows.map((row) => {
        return (0, import_utils6.mapResultRow)(this.fields, row, this.joinsNotNullableMap);
      });
    }
    async all(placeholderValues) {
      const { query, logger, client } = this;
      const params = (0, import_sql2.fillPlaceholders)(query.params, placeholderValues ?? {});
      logger.logQuery(query.sql, params);
      const { rows } = await this.queryWithCache(query.sql, params, async () => {
        return await client(query.sql, params, "all");
      });
      return this.mapAllResult(rows);
    }
    async get(placeholderValues) {
      const { query, logger, client } = this;
      const params = (0, import_sql2.fillPlaceholders)(query.params, placeholderValues ?? {});
      logger.logQuery(query.sql, params);
      const clientResult = await this.queryWithCache(query.sql, params, async () => {
        return await client(query.sql, params, "get");
      });
      return this.mapGetResult(clientResult.rows);
    }
    mapGetResult(rows, isFromBatch) {
      if (isFromBatch) {
        rows = rows.rows;
      }
      const row = rows;
      if (!this.fields && !this.customResultMapper) {
        return row;
      }
      if (!row) {
        return;
      }
      if (this.customResultMapper) {
        return this.customResultMapper([rows]);
      }
      return (0, import_utils6.mapResultRow)(this.fields, row, this.joinsNotNullableMap);
    }
    async values(placeholderValues) {
      const params = (0, import_sql2.fillPlaceholders)(this.query.params, placeholderValues ?? {});
      this.logger.logQuery(this.query.sql, params);
      const clientResult = await this.queryWithCache(this.query.sql, params, async () => {
        return await this.client(this.query.sql, params, "values");
      });
      return clientResult.rows;
    }
    isResponseInArrayMode() {
      return this._isResponseInArrayMode;
    }
  }
});

// node_modules/drizzle-orm/sqlite-proxy/driver.cjs
var require_driver = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var driver_exports = {};
  __export2(driver_exports, {
    SqliteRemoteDatabase: () => SqliteRemoteDatabase,
    drizzle: () => drizzle
  });
  module.exports = __toCommonJS(driver_exports);
  var import_entity18 = require_entity();
  var import_logger = require_logger();
  var import_relations = require_relations();
  var import_db = require_db();
  var import_dialect = require_dialect();
  var import_session = require_session2();

  class SqliteRemoteDatabase extends import_db.BaseSQLiteDatabase {
    static [import_entity18.entityKind] = "SqliteRemoteDatabase";
    async batch(batch) {
      return this.session.batch(batch);
    }
  }
  function drizzle(callback, batchCallback, config) {
    const dialect = new import_dialect.SQLiteAsyncDialect({ casing: config?.casing });
    let logger;
    let cache;
    let _batchCallback;
    let _config = {};
    if (batchCallback) {
      if (typeof batchCallback === "function") {
        _batchCallback = batchCallback;
        _config = config ?? {};
      } else {
        _batchCallback = undefined;
        _config = batchCallback;
      }
      if (_config.logger === true) {
        logger = new import_logger.DefaultLogger;
      } else if (_config.logger !== false) {
        logger = _config.logger;
        cache = _config.cache;
      }
    }
    let schema;
    if (_config.schema) {
      const tablesConfig = (0, import_relations.extractTablesRelationalConfig)(_config.schema, import_relations.createTableRelationsHelpers);
      schema = {
        fullSchema: _config.schema,
        schema: tablesConfig.tables,
        tableNamesMap: tablesConfig.tableNamesMap
      };
    }
    const session = new import_session.SQLiteRemoteSession(callback, dialect, schema, _batchCallback, { logger, cache });
    const db = new SqliteRemoteDatabase("async", dialect, session, schema);
    db.$cache = cache;
    if (db.$cache) {
      db.$cache["invalidate"] = cache?.onMutate;
    }
    return db;
  }
});

// node_modules/drizzle-orm/sqlite-proxy/index.cjs
var require_sqlite_proxy = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var sqlite_proxy_exports = {};
  module.exports = __toCommonJS(sqlite_proxy_exports);
  __reExport(sqlite_proxy_exports, require_driver(), module.exports);
  __reExport(sqlite_proxy_exports, require_session2(), module.exports);
});

// node_modules/drizzle-orm/migrator.cjs
var require_migrator = __commonJS((exports, module) => {
  var __create = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var migrator_exports = {};
  __export2(migrator_exports, {
    readMigrationFiles: () => readMigrationFiles
  });
  module.exports = __toCommonJS(migrator_exports);
  var import_node_crypto = __toESM(__require("node:crypto"), 1);
  var import_node_fs = __toESM(__require("node:fs"), 1);
  function readMigrationFiles(config) {
    const migrationFolderTo = config.migrationsFolder;
    const migrationQueries = [];
    const journalPath = `${migrationFolderTo}/meta/_journal.json`;
    if (!import_node_fs.default.existsSync(journalPath)) {
      throw new Error(`Can't find meta/_journal.json file`);
    }
    const journalAsString = import_node_fs.default.readFileSync(`${migrationFolderTo}/meta/_journal.json`).toString();
    const journal = JSON.parse(journalAsString);
    for (const journalEntry of journal.entries) {
      const migrationPath = `${migrationFolderTo}/${journalEntry.tag}.sql`;
      try {
        const query = import_node_fs.default.readFileSync(`${migrationFolderTo}/${journalEntry.tag}.sql`).toString();
        const result = query.split("--> statement-breakpoint").map((it) => {
          return it;
        });
        migrationQueries.push({
          sql: result,
          bps: journalEntry.breakpoints,
          folderMillis: journalEntry.when,
          hash: import_node_crypto.default.createHash("sha256").update(query).digest("hex")
        });
      } catch {
        throw new Error(`No file ${migrationPath} found in ${migrationFolderTo} folder`);
      }
    }
    return migrationQueries;
  }
});

// node_modules/drizzle-orm/sqlite-proxy/migrator.cjs
var require_migrator2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var migrator_exports = {};
  __export2(migrator_exports, {
    migrate: () => migrate
  });
  module.exports = __toCommonJS(migrator_exports);
  var import_migrator = require_migrator();
  var import_sql2 = require_sql();
  async function migrate(db, callback, config) {
    const migrations = (0, import_migrator.readMigrationFiles)(config);
    const migrationsTable = typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
    const migrationTableCreate = import_sql2.sql`
		CREATE TABLE IF NOT EXISTS ${import_sql2.sql.identifier(migrationsTable)} (
			id SERIAL PRIMARY KEY,
			hash text NOT NULL,
			created_at numeric
		)
	`;
    await db.run(migrationTableCreate);
    const dbMigrations = await db.values(import_sql2.sql`SELECT id, hash, created_at FROM ${import_sql2.sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`);
    const lastDbMigration = dbMigrations[0] ?? undefined;
    const queriesToRun = [];
    for (const migration of migrations) {
      if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
        queriesToRun.push(...migration.sql, `INSERT INTO \`${migrationsTable}\` ("hash", "created_at") VALUES('${migration.hash}', '${migration.folderMillis}')`);
      }
    }
    await callback(queriesToRun);
  }
});

// node_modules/@kilocode/app-builder-db/dist/index.js
var require_dist = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var index_exports = {};
  __export2(index_exports, {
    createDatabase: () => createDatabase,
    createDatabaseWithoutSchema: () => createDatabaseWithoutSchema,
    createExecuteQuery: () => createExecuteQuery,
    createMigrationRunner: () => createMigrationRunner,
    runMigrations: () => runMigrations
  });
  module.exports = __toCommonJS(index_exports);
  var import_sqlite_proxy = require_sqlite_proxy();
  function createExecuteQuery(config = {}) {
    const url = config.url ?? process.env.DB_URL;
    const token = config.token ?? process.env.DB_TOKEN;
    if (!url || !token) {
      throw new Error("Missing database configuration. Provide url and token in config or set DB_URL and DB_TOKEN environment variables.");
    }
    return async function executeQuery(sql2, params, method) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sql: sql2, params, method })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Query failed");
      }
      return response.json();
    };
  }
  function createDatabase(schema, config = {}) {
    const executeQuery = createExecuteQuery(config);
    return (0, import_sqlite_proxy.drizzle)(async (sql2, params, method) => {
      const result = await executeQuery(sql2, params, method);
      return { rows: result.rows };
    }, { schema });
  }
  function createDatabaseWithoutSchema(config = {}) {
    const executeQuery = createExecuteQuery(config);
    return (0, import_sqlite_proxy.drizzle)(async (sql2, params, method) => {
      const result = await executeQuery(sql2, params, method);
      return { rows: result.rows };
    });
  }
  var import_migrator = require_migrator2();
  async function runMigrations(db, config = {}, options = {}) {
    const executeQuery = createExecuteQuery(config);
    const migrationsFolder = options.migrationsFolder ?? "./src/db/migrations";
    await (0, import_migrator.migrate)(db, async (queries) => {
      for (const query of queries) {
        await executeQuery(query, [], "run");
      }
    }, {
      migrationsFolder
    });
  }
  function createMigrationRunner(db, config = {}) {
    return async (migrationsFolder = "./src/db/migrations") => {
      await runMigrations(db, config, { migrationsFolder });
    };
  }
});

// node_modules/drizzle-orm/bun-sqlite/session.cjs
var require_session3 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var session_exports = {};
  __export2(session_exports, {
    PreparedQuery: () => PreparedQuery,
    SQLiteBunSession: () => SQLiteBunSession,
    SQLiteBunTransaction: () => SQLiteBunTransaction
  });
  module.exports = __toCommonJS(session_exports);
  var import_entity18 = require_entity();
  var import_logger = require_logger();
  var import_sql2 = require_sql();
  var import_sqlite_core2 = require_sqlite_core();
  var import_session = require_session();
  var import_utils6 = require_utils();

  class SQLiteBunSession extends import_session.SQLiteSession {
    constructor(client, dialect, schema, options = {}) {
      super(dialect);
      this.client = client;
      this.schema = schema;
      this.logger = options.logger ?? new import_logger.NoopLogger;
    }
    static [import_entity18.entityKind] = "SQLiteBunSession";
    logger;
    exec(query) {
      this.client.exec(query);
    }
    prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper) {
      const stmt = this.client.prepare(query.sql);
      return new PreparedQuery(stmt, query, this.logger, fields, executeMethod, isResponseInArrayMode, customResultMapper);
    }
    transaction(transaction, config = {}) {
      const tx = new SQLiteBunTransaction("sync", this.dialect, this, this.schema);
      let result;
      const nativeTx = this.client.transaction(() => {
        result = transaction(tx);
      });
      nativeTx[config.behavior ?? "deferred"]();
      return result;
    }
  }

  class SQLiteBunTransaction extends import_sqlite_core2.SQLiteTransaction {
    static [import_entity18.entityKind] = "SQLiteBunTransaction";
    transaction(transaction) {
      const savepointName = `sp${this.nestedIndex}`;
      const tx = new SQLiteBunTransaction("sync", this.dialect, this.session, this.schema, this.nestedIndex + 1);
      this.session.run(import_sql2.sql.raw(`savepoint ${savepointName}`));
      try {
        const result = transaction(tx);
        this.session.run(import_sql2.sql.raw(`release savepoint ${savepointName}`));
        return result;
      } catch (err) {
        this.session.run(import_sql2.sql.raw(`rollback to savepoint ${savepointName}`));
        throw err;
      }
    }
  }

  class PreparedQuery extends import_session.SQLitePreparedQuery {
    constructor(stmt, query, logger, fields, executeMethod, _isResponseInArrayMode, customResultMapper) {
      super("sync", executeMethod, query);
      this.stmt = stmt;
      this.logger = logger;
      this.fields = fields;
      this._isResponseInArrayMode = _isResponseInArrayMode;
      this.customResultMapper = customResultMapper;
    }
    static [import_entity18.entityKind] = "SQLiteBunPreparedQuery";
    run(placeholderValues) {
      const params = (0, import_sql2.fillPlaceholders)(this.query.params, placeholderValues ?? {});
      this.logger.logQuery(this.query.sql, params);
      return this.stmt.run(...params);
    }
    all(placeholderValues) {
      const { fields, query, logger, joinsNotNullableMap, stmt, customResultMapper } = this;
      if (!fields && !customResultMapper) {
        const params = (0, import_sql2.fillPlaceholders)(query.params, placeholderValues ?? {});
        logger.logQuery(query.sql, params);
        return stmt.all(...params);
      }
      const rows = this.values(placeholderValues);
      if (customResultMapper) {
        return customResultMapper(rows);
      }
      return rows.map((row) => (0, import_utils6.mapResultRow)(fields, row, joinsNotNullableMap));
    }
    get(placeholderValues) {
      const params = (0, import_sql2.fillPlaceholders)(this.query.params, placeholderValues ?? {});
      this.logger.logQuery(this.query.sql, params);
      const row = this.stmt.values(...params)[0];
      if (!row) {
        return;
      }
      const { fields, joinsNotNullableMap, customResultMapper } = this;
      if (!fields && !customResultMapper) {
        return row;
      }
      if (customResultMapper) {
        return customResultMapper([row]);
      }
      return (0, import_utils6.mapResultRow)(fields, row, joinsNotNullableMap);
    }
    values(placeholderValues) {
      const params = (0, import_sql2.fillPlaceholders)(this.query.params, placeholderValues ?? {});
      this.logger.logQuery(this.query.sql, params);
      return this.stmt.values(...params);
    }
    isResponseInArrayMode() {
      return this._isResponseInArrayMode;
    }
  }
});

// node_modules/drizzle-orm/bun-sqlite/driver.cjs
var require_driver2 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var driver_exports = {};
  __export2(driver_exports, {
    BunSQLiteDatabase: () => BunSQLiteDatabase,
    drizzle: () => drizzle
  });
  module.exports = __toCommonJS(driver_exports);
  var import_bun_sqlite = __require("bun:sqlite");
  var import_entity18 = require_entity();
  var import_logger = require_logger();
  var import_relations = require_relations();
  var import_db = require_db();
  var import_dialect = require_dialect();
  var import_utils6 = require_utils();
  var import_session = require_session3();

  class BunSQLiteDatabase extends import_db.BaseSQLiteDatabase {
    static [import_entity18.entityKind] = "BunSQLiteDatabase";
  }
  function construct(client, config = {}) {
    const dialect = new import_dialect.SQLiteSyncDialect({ casing: config.casing });
    let logger;
    if (config.logger === true) {
      logger = new import_logger.DefaultLogger;
    } else if (config.logger !== false) {
      logger = config.logger;
    }
    let schema;
    if (config.schema) {
      const tablesConfig = (0, import_relations.extractTablesRelationalConfig)(config.schema, import_relations.createTableRelationsHelpers);
      schema = {
        fullSchema: config.schema,
        schema: tablesConfig.tables,
        tableNamesMap: tablesConfig.tableNamesMap
      };
    }
    const session = new import_session.SQLiteBunSession(client, dialect, schema, { logger });
    const db = new BunSQLiteDatabase("sync", dialect, session, schema);
    db.$client = client;
    return db;
  }
  function drizzle(...params) {
    if (params[0] === undefined || typeof params[0] === "string") {
      const instance = params[0] === undefined ? new import_bun_sqlite.Database : new import_bun_sqlite.Database(params[0]);
      return construct(instance, params[1]);
    }
    if ((0, import_utils6.isConfig)(params[0])) {
      const { connection, client, ...drizzleConfig } = params[0];
      if (client)
        return construct(client, drizzleConfig);
      if (typeof connection === "object") {
        const { source, ...opts } = connection;
        const options = Object.values(opts).filter((v) => v !== undefined).length ? opts : undefined;
        const instance2 = new import_bun_sqlite.Database(source, options);
        return construct(instance2, drizzleConfig);
      }
      const instance = new import_bun_sqlite.Database(connection);
      return construct(instance, drizzleConfig);
    }
    return construct(params[0], params[1]);
  }
  ((drizzle2) => {
    function mock(config) {
      return construct({}, config);
    }
    drizzle2.mock = mock;
  })(drizzle || (drizzle = {}));
});

// node_modules/drizzle-orm/bun-sqlite/index.cjs
var require_bun_sqlite = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var bun_sqlite_exports = {};
  module.exports = __toCommonJS(bun_sqlite_exports);
  __reExport(bun_sqlite_exports, require_driver2(), module.exports);
  __reExport(bun_sqlite_exports, require_session3(), module.exports);
});

// node_modules/drizzle-orm/bun-sqlite/migrator.cjs
var require_migrator3 = __commonJS((exports, module) => {
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
  var migrator_exports = {};
  __export2(migrator_exports, {
    migrate: () => migrate
  });
  module.exports = __toCommonJS(migrator_exports);
  var import_migrator = require_migrator();
  function migrate(db, config) {
    const migrations = (0, import_migrator.readMigrationFiles)(config);
    db.dialect.migrate(migrations, db.session, config);
  }
});

// src/db/schema.ts
var exports_schema = {};
__export(exports_schema, {
  users: () => users,
  tickets: () => tickets,
  sessions: () => sessions,
  praticheClienti: () => praticheClienti,
  pratiche: () => pratiche,
  documenti: () => documenti,
  clienti: () => clienti
});

// node_modules/drizzle-orm/entity.js
var entityKind = Symbol.for("drizzle:entityKind");
var hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}

// node_modules/drizzle-orm/column.js
class Column {
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.keyAsName = config.keyAsName;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.onUpdateFn = config.onUpdateFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
    this.generated = config.generated;
    this.generatedIdentity = config.generatedIdentity;
  }
  static [entityKind] = "Column";
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = undefined;
  generated = undefined;
  generatedIdentity = undefined;
  config;
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
  shouldDisableInsert() {
    return this.config.generated !== undefined && this.config.generated.type !== "byDefault";
  }
}

// node_modules/drizzle-orm/column-builder.js
class ColumnBuilder {
  static [entityKind] = "ColumnBuilder";
  config;
  constructor(name, dataType, columnType) {
    this.config = {
      name,
      keyAsName: name === "",
      notNull: false,
      default: undefined,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: undefined,
      uniqueType: undefined,
      dataType,
      columnType,
      generated: undefined
    };
  }
  $type() {
    return this;
  }
  notNull() {
    this.config.notNull = true;
    return this;
  }
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  $default = this.$defaultFn;
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  $onUpdate = this.$onUpdateFn;
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
  setName(name) {
    if (this.config.name !== "")
      return;
    this.config.name = name;
  }
}

// node_modules/drizzle-orm/table.utils.js
var TableName = Symbol.for("drizzle:Name");

// node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}

// node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}

// node_modules/drizzle-orm/pg-core/columns/common.js
class PgColumn extends Column {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "PgColumn";
}

class ExtraConfigColumn extends PgColumn {
  static [entityKind] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: undefined
  };
  asc() {
    this.indexConfig.order = "asc";
    return this;
  }
  desc() {
    this.indexConfig.order = "desc";
    return this;
  }
  nullsFirst() {
    this.indexConfig.nulls = "first";
    return this;
  }
  nullsLast() {
    this.indexConfig.nulls = "last";
    return this;
  }
  op(opClass) {
    this.indexConfig.opClass = opClass;
    return this;
  }
}

// node_modules/drizzle-orm/pg-core/columns/enum.js
class PgEnumObjectColumn extends PgColumn {
  static [entityKind] = "PgEnumObjectColumn";
  enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
}
var isPgEnumSym = Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
class PgEnumColumn extends PgColumn {
  static [entityKind] = "PgEnumColumn";
  enum = this.config.enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
}

// node_modules/drizzle-orm/subquery.js
class Subquery {
  static [entityKind] = "Subquery";
  constructor(sql, fields, alias, isWith = false, usedTables = []) {
    this._ = {
      brand: "Subquery",
      sql,
      selectedFields: fields,
      alias,
      isWith,
      usedTables
    };
  }
}

// node_modules/drizzle-orm/version.js
var version = "0.45.2";

// node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
  startActiveSpan(name, fn) {
    if (!otel) {
      return fn();
    }
    if (!rawTracer) {
      rawTracer = otel.trace.getTracer("drizzle-orm", version);
    }
    return iife((otel2, rawTracer2) => rawTracer2.startActiveSpan(name, (span) => {
      try {
        return fn(span);
      } catch (e) {
        span.setStatus({
          code: otel2.SpanStatusCode.ERROR,
          message: e instanceof Error ? e.message : "Unknown error"
        });
        throw e;
      } finally {
        span.end();
      }
    }), otel, rawTracer);
  }
};

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");

// node_modules/drizzle-orm/table.js
var Schema = Symbol.for("drizzle:Schema");
var Columns = Symbol.for("drizzle:Columns");
var ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
var OriginalName = Symbol.for("drizzle:OriginalName");
var BaseName = Symbol.for("drizzle:BaseName");
var IsAlias = Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");

class Table {
  static [entityKind] = "Table";
  static Symbol = {
    Name: TableName,
    Schema,
    OriginalName,
    Columns,
    ExtraConfigColumns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  [TableName];
  [OriginalName];
  [Schema];
  [Columns];
  [ExtraConfigColumns];
  [BaseName];
  [IsAlias] = false;
  [IsDrizzleTable] = true;
  [ExtraConfigBuilder] = undefined;
  constructor(name, schema, baseName) {
    this[TableName] = this[OriginalName] = name;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
}

// node_modules/drizzle-orm/sql/sql.js
function isSQLWrapper(value) {
  return value !== null && value !== undefined && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}

class StringChunk {
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
}

class SQL {
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
    for (const chunk of queryChunks) {
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        this.usedTables.push(schemaName === undefined ? chunk[Table.Symbol.Name] : schemaName + "." + chunk[Table.Symbol.Name]);
      }
    }
  }
  static [entityKind] = "SQL";
  decoder = noopDecoder;
  shouldInlineParams = false;
  usedTables = [];
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const {
      casing,
      escapeName,
      escapeParam,
      prepareTyping,
      inlineParams,
      paramStartIndex
    } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (is(chunk, Name)) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === undefined) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i, p] of chunk.entries()) {
          result.push(p);
          if (i < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (is(chunk, SQL)) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, {
          ...config,
          inlineParams: inlineParams || chunk.shouldInlineParams
        });
      }
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === undefined || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        const columnName = casing.getColumnCasing(chunk);
        if (_config.invokeSource === "indexes") {
          return { sql: escapeName(columnName), params: [] };
        }
        const schemaName = chunk.table[Table.Symbol.Schema];
        return {
          sql: chunk.table[IsAlias] || schemaName === undefined ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
          params: []
        };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === undefined || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        if (is(chunk.value, Placeholder)) {
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, SQL)) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings = ["none"];
        if (prepareTyping) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (is(chunk, Placeholder)) {
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
      }
      if (is(chunk, SQL.Aliased) && chunk.fieldAlias !== undefined) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (is(chunk, Subquery)) {
        if (chunk._.isWith) {
          return { sql: escapeName(chunk._.alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk._.sql,
          new StringChunk(") "),
          new Name(chunk._.alias)
        ], config);
      }
      if (isPgEnum(chunk)) {
        if (chunk.schema) {
          return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
        }
        return { sql: escapeName(chunk.enumName), params: [] };
      }
      if (isSQLWrapper(chunk)) {
        if (chunk.shouldOmitSQLParens?.()) {
          return this.buildQueryFromSourceParams([chunk.getSQL()], config);
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === undefined) {
      return this;
    }
    return new SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  if(condition) {
    return condition ? this : undefined;
  }
}

class Name {
  constructor(value) {
    this.value = value;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
var noopDecoder = {
  mapFromDriverValue: (value) => value
};
var noopEncoder = {
  mapToDriverValue: (value) => value
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};

class Param {
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
  static [entityKind] = "Param";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
((sql2) => {
  function empty() {
    return new SQL([]);
  }
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql2.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql2.raw = raw;
  function join(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0 && separator !== undefined) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  sql2.join = join;
  function identifier(value) {
    return new Name(value);
  }
  sql2.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  sql2.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {

  class Aliased {
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    static [entityKind] = "SQL.Aliased";
    isSelectionField = false;
    getSQL() {
      return this.sql;
    }
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));

class Placeholder {
  constructor(name2) {
    this.name = name2;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
}
var IsDrizzleView = Symbol.for("drizzle:IsDrizzleView");

class View {
  static [entityKind] = "View";
  [ViewBaseConfig];
  [IsDrizzleView] = true;
  constructor({ name: name2, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
  getSQL() {
    return new SQL([this]);
  }
}
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Table.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// node_modules/drizzle-orm/utils.js
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === "string" && a.length > 0 ? a : "",
    config: typeof a === "object" ? a : b
  };
}
var textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder;

// node_modules/drizzle-orm/sqlite-core/foreign-keys.js
class ForeignKeyBuilder {
  static [entityKind] = "SQLiteForeignKeyBuilder";
  reference;
  _onUpdate;
  _onDelete;
  constructor(config, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  build(table) {
    return new ForeignKey(table, this);
  }
}

class ForeignKey {
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "SQLiteForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
}

// node_modules/drizzle-orm/sqlite-core/unique-constraint.js
function uniqueKeyName2(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
function unique(name) {
  return new UniqueOnConstraintBuilder(name);
}

class UniqueConstraintBuilder {
  constructor(columns, name) {
    this.name = name;
    this.columns = columns;
  }
  static [entityKind] = "SQLiteUniqueConstraintBuilder";
  columns;
  build(table) {
    return new UniqueConstraint(table, this.columns, this.name);
  }
}

class UniqueOnConstraintBuilder {
  static [entityKind] = "SQLiteUniqueOnConstraintBuilder";
  name;
  constructor(name) {
    this.name = name;
  }
  on(...columns) {
    return new UniqueConstraintBuilder(columns, this.name);
  }
}

class UniqueConstraint {
  constructor(table, columns, name) {
    this.table = table;
    this.columns = columns;
    this.name = name ?? uniqueKeyName2(this.table, this.columns.map((column) => column.name));
  }
  static [entityKind] = "SQLiteUniqueConstraint";
  columns;
  name;
  getName() {
    return this.name;
  }
}

// node_modules/drizzle-orm/sqlite-core/columns/common.js
class SQLiteColumnBuilder extends ColumnBuilder {
  static [entityKind] = "SQLiteColumnBuilder";
  foreignKeyConfigs = [];
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    return this;
  }
  generatedAlwaysAs(as, config) {
    this.config.generated = {
      as,
      type: "always",
      mode: config?.mode ?? "virtual"
    };
    return this;
  }
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return ((ref2, actions2) => {
        const builder = new ForeignKeyBuilder(() => {
          const foreignColumn = ref2();
          return { columns: [column], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table);
      })(ref, actions);
    });
  }
}

class SQLiteColumn extends Column {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName2(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "SQLiteColumn";
}

// node_modules/drizzle-orm/sqlite-core/columns/blob.js
class SQLiteBigIntBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBigIntBuilder";
  constructor(name) {
    super(name, "bigint", "SQLiteBigInt");
  }
  build(table) {
    return new SQLiteBigInt(table, this.config);
  }
}

class SQLiteBigInt extends SQLiteColumn {
  static [entityKind] = "SQLiteBigInt";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (typeof Buffer !== "undefined" && Buffer.from) {
      const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
      return BigInt(buf.toString("utf8"));
    }
    return BigInt(textDecoder.decode(value));
  }
  mapToDriverValue(value) {
    return Buffer.from(value.toString());
  }
}

class SQLiteBlobJsonBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteBlobJson");
  }
  build(table) {
    return new SQLiteBlobJson(table, this.config);
  }
}

class SQLiteBlobJson extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobJson";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (typeof Buffer !== "undefined" && Buffer.from) {
      const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
      return JSON.parse(buf.toString("utf8"));
    }
    return JSON.parse(textDecoder.decode(value));
  }
  mapToDriverValue(value) {
    return Buffer.from(JSON.stringify(value));
  }
}

class SQLiteBlobBufferBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobBufferBuilder";
  constructor(name) {
    super(name, "buffer", "SQLiteBlobBuffer");
  }
  build(table) {
    return new SQLiteBlobBuffer(table, this.config);
  }
}

class SQLiteBlobBuffer extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobBuffer";
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) {
      return value;
    }
    return Buffer.from(value);
  }
  getSQLType() {
    return "blob";
  }
}
function blob(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "json") {
    return new SQLiteBlobJsonBuilder(name);
  }
  if (config?.mode === "bigint") {
    return new SQLiteBigIntBuilder(name);
  }
  return new SQLiteBlobBufferBuilder(name);
}

// node_modules/drizzle-orm/sqlite-core/columns/custom.js
class SQLiteCustomColumnBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteCustomColumnBuilder";
  constructor(name, fieldConfig, customTypeParams) {
    super(name, "custom", "SQLiteCustomColumn");
    this.config.fieldConfig = fieldConfig;
    this.config.customTypeParams = customTypeParams;
  }
  build(table) {
    return new SQLiteCustomColumn(table, this.config);
  }
}

class SQLiteCustomColumn extends SQLiteColumn {
  static [entityKind] = "SQLiteCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  constructor(table, config) {
    super(table, config);
    this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
    this.mapTo = config.customTypeParams.toDriver;
    this.mapFrom = config.customTypeParams.fromDriver;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(value) {
    return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
  }
  mapToDriverValue(value) {
    return typeof this.mapTo === "function" ? this.mapTo(value) : value;
  }
}
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config } = getColumnNameAndConfig(a, b);
    return new SQLiteCustomColumnBuilder(name, config, customTypeParams);
  };
}

// node_modules/drizzle-orm/sqlite-core/columns/integer.js
class SQLiteBaseIntegerBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBaseIntegerBuilder";
  constructor(name, dataType, columnType) {
    super(name, dataType, columnType);
    this.config.autoIncrement = false;
  }
  primaryKey(config) {
    if (config?.autoIncrement) {
      this.config.autoIncrement = true;
    }
    this.config.hasDefault = true;
    return super.primaryKey();
  }
}

class SQLiteBaseInteger extends SQLiteColumn {
  static [entityKind] = "SQLiteBaseInteger";
  autoIncrement = this.config.autoIncrement;
  getSQLType() {
    return "integer";
  }
}

class SQLiteIntegerBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteIntegerBuilder";
  constructor(name) {
    super(name, "number", "SQLiteInteger");
  }
  build(table) {
    return new SQLiteInteger(table, this.config);
  }
}

class SQLiteInteger extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteInteger";
}

class SQLiteTimestampBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteTimestampBuilder";
  constructor(name, mode) {
    super(name, "date", "SQLiteTimestamp");
    this.config.mode = mode;
  }
  defaultNow() {
    return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(table) {
    return new SQLiteTimestamp(table, this.config);
  }
}

class SQLiteTimestamp extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteTimestamp";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    if (this.config.mode === "timestamp") {
      return new Date(value * 1000);
    }
    return new Date(value);
  }
  mapToDriverValue(value) {
    const unix = value.getTime();
    if (this.config.mode === "timestamp") {
      return Math.floor(unix / 1000);
    }
    return unix;
  }
}

class SQLiteBooleanBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteBooleanBuilder";
  constructor(name, mode) {
    super(name, "boolean", "SQLiteBoolean");
    this.config.mode = mode;
  }
  build(table) {
    return new SQLiteBoolean(table, this.config);
  }
}

class SQLiteBoolean extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteBoolean";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    return Number(value) === 1;
  }
  mapToDriverValue(value) {
    return value ? 1 : 0;
  }
}
function integer(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if (config?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
}

// node_modules/drizzle-orm/sqlite-core/columns/numeric.js
class SQLiteNumericBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericBuilder";
  constructor(name) {
    super(name, "string", "SQLiteNumeric");
  }
  build(table) {
    return new SQLiteNumeric(table, this.config);
  }
}

class SQLiteNumeric extends SQLiteColumn {
  static [entityKind] = "SQLiteNumeric";
  mapFromDriverValue(value) {
    if (typeof value === "string")
      return value;
    return String(value);
  }
  getSQLType() {
    return "numeric";
  }
}

class SQLiteNumericNumberBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericNumberBuilder";
  constructor(name) {
    super(name, "number", "SQLiteNumericNumber");
  }
  build(table) {
    return new SQLiteNumericNumber(table, this.config);
  }
}

class SQLiteNumericNumber extends SQLiteColumn {
  static [entityKind] = "SQLiteNumericNumber";
  mapFromDriverValue(value) {
    if (typeof value === "number")
      return value;
    return Number(value);
  }
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
}

class SQLiteNumericBigIntBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericBigIntBuilder";
  constructor(name) {
    super(name, "bigint", "SQLiteNumericBigInt");
  }
  build(table) {
    return new SQLiteNumericBigInt(table, this.config);
  }
}

class SQLiteNumericBigInt extends SQLiteColumn {
  static [entityKind] = "SQLiteNumericBigInt";
  mapFromDriverValue = BigInt;
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
}
function numeric(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  const mode = config?.mode;
  return mode === "number" ? new SQLiteNumericNumberBuilder(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder(name) : new SQLiteNumericBuilder(name);
}

// node_modules/drizzle-orm/sqlite-core/columns/real.js
class SQLiteRealBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteRealBuilder";
  constructor(name) {
    super(name, "number", "SQLiteReal");
  }
  build(table) {
    return new SQLiteReal(table, this.config);
  }
}

class SQLiteReal extends SQLiteColumn {
  static [entityKind] = "SQLiteReal";
  getSQLType() {
    return "real";
  }
}
function real(name) {
  return new SQLiteRealBuilder(name ?? "");
}

// node_modules/drizzle-orm/sqlite-core/columns/text.js
class SQLiteTextBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextBuilder";
  constructor(name, config) {
    super(name, "string", "SQLiteText");
    this.config.enumValues = config.enum;
    this.config.length = config.length;
  }
  build(table) {
    return new SQLiteText(table, this.config);
  }
}

class SQLiteText extends SQLiteColumn {
  static [entityKind] = "SQLiteText";
  enumValues = this.config.enumValues;
  length = this.config.length;
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ""}`;
  }
}

class SQLiteTextJsonBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteTextJson");
  }
  build(table) {
    return new SQLiteTextJson(table, this.config);
  }
}

class SQLiteTextJson extends SQLiteColumn {
  static [entityKind] = "SQLiteTextJson";
  getSQLType() {
    return "text";
  }
  mapFromDriverValue(value) {
    return JSON.parse(value);
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
}
function text(a, b = {}) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config.mode === "json") {
    return new SQLiteTextJsonBuilder(name);
  }
  return new SQLiteTextBuilder(name, config);
}

// node_modules/drizzle-orm/sqlite-core/columns/all.js
function getSQLiteColumnBuilders() {
  return {
    blob,
    customType,
    integer,
    numeric,
    real,
    text
  };
}

// node_modules/drizzle-orm/sqlite-core/table.js
var InlineForeignKeys = Symbol.for("drizzle:SQLiteInlineForeignKeys");

class SQLiteTable extends Table {
  static [entityKind] = "SQLiteTable";
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys
  });
  [Table.Symbol.Columns];
  [InlineForeignKeys] = [];
  [Table.Symbol.ExtraConfigBuilder] = undefined;
}
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getSQLiteColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    colBuilder.setName(name2);
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name2, column];
  }));
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumns;
  if (extraConfig) {
    table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
var sqliteTable = (name, columns, extraConfig) => {
  return sqliteTableBase(name, columns, extraConfig);
};

// src/db/schema.ts
var users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["admin", "geometra", "cliente"] }).notNull().default("cliente"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date)
});
var sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull()
});
var clienti = sqliteTable("clienti", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  cognome: text("cognome").notNull(),
  email: text("email"),
  telefono: text("telefono"),
  indirizzo: text("indirizzo"),
  codiceFiscale: text("codice_fiscale"),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date)
});
var pratiche = sqliteTable("pratiche", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titolo: text("titolo").notNull(),
  descrizione: text("descrizione"),
  stato: text("stato", {
    enum: ["aperta", "in_corso", "sospesa", "chiusa"]
  }).notNull().default("aperta"),
  indirizzo: text("indirizzo"),
  foglio: text("foglio"),
  particella: text("particella"),
  sub: text("sub"),
  clienteId: integer("cliente_id").references(() => clienti.id, {
    onDelete: "set null"
  }),
  geometraId: integer("geometra_id").references(() => users.id, {
    onDelete: "set null"
  }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date)
});
var praticheClienti = sqliteTable("pratiche_clienti", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  praticaId: integer("pratica_id").notNull().references(() => pratiche.id, { onDelete: "cascade" }),
  clienteId: integer("cliente_id").notNull().references(() => clienti.id, { onDelete: "cascade" })
}, (t) => [unique().on(t.praticaId, t.clienteId)]);
var documenti = sqliteTable("documenti", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type"),
  dimensione: integer("dimensione"),
  praticaId: integer("pratica_id").notNull().references(() => pratiche.id, { onDelete: "cascade" }),
  caricatoDa: integer("caricato_da").notNull().references(() => users.id),
  visibileAlCliente: integer("visibile_al_cliente", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date)
});
var tickets = sqliteTable("tickets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titolo: text("titolo").notNull(),
  messaggio: text("messaggio"),
  stato: text("stato", {
    enum: ["aperto", "in_lavorazione", "risolto"]
  }).notNull().default("aperto"),
  praticaId: integer("pratica_id").references(() => pratiche.id, {
    onDelete: "set null"
  }),
  clienteId: integer("cliente_id").notNull().references(() => clienti.id, { onDelete: "cascade" }),
  geometraId: integer("geometra_id").references(() => users.id, {
    onDelete: "set null"
  }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date)
});

// src/db/index.ts
function createDb() {
  if (process.env.DB_URL && process.env.DB_TOKEN) {
    const { createDatabase } = require_dist();
    return createDatabase(exports_schema);
  }
  const { Database } = __require("bun:sqlite");
  const { drizzle } = require_bun_sqlite();
  const sqlite = new Database("./geogest.db");
  sqlite.exec("PRAGMA journal_mode = WAL");
  sqlite.exec("PRAGMA foreign_keys = ON");
  const { migrate } = require_migrator3();
  const instance = drizzle(sqlite, { schema: exports_schema });
  try {
    migrate(instance, { migrationsFolder: "./src/db/migrations" });
  } catch {}
  return instance;
}
var db = createDb();
export {
  db
};

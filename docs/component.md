## component
The generic class that all components inherit from

* [set_target](#set_target)
* [set_id](#set_id)
* [set_name](#set_name)
* [get_id](#get_id)

## set_target
Sets the target of the component

### Syntax
```typescript
public set_target(target: string): void;
```

### Parameters
`target` <br>
Type: **string** <br>
The target id of the component it needs to append to <br>

## set_id
Sets the target of the component

### Syntax
```typescript
public set_id(id: string): void;
```

### Parameters
`id` <br>
Type: **string** <br>
Overrides the default generated id <br>

## set_name
Sets generic name of a component. Calling this function will force a re render

### Syntax
```typescript
public set_name(name: string): void;
```

### Parameters
`name` <br>
Type: **string** <br>
The new name this component needs to have <br>

### Remarks
Some function use this **name** attirbute as a value instead of a name

## get_id
Returns the id of the component

### Syntax
```typescript
public get_id(): string;
```

### Return value
Type: **string** <br>
The id of the component
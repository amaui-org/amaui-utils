

## API

#### wait

```ts
const wait: (milliseconds?: number) => Promise<undefined>;
```

>);
```

#### IVariationOptions

```ts
interface IVariationOptions {
    response?: 'array' | 'yield';
}
```

#### variationWithRepetition

```ts
function variationWithRepetition(value_: any[], items?: number, options_?: IVariationOptions): TVariation;
```

(value_: any, type?: TType, options_?: IOptions) => TTo;
```

dditions?: boolean) => void;
```

#### filePolyfills

```ts
const filePolyfills: (additions?: boolean) => void;
```

#### blobPolyfills

```ts
const blobPolyfills: (additions?: boolean) => void;
```

#### functionPolyfills

```ts
const functionPolyfills: (additions?: boolean) => void;
```

#### arrayBufferPolyfill

```ts
const arrayBufferPolyfill: () => void;
```

#### browserPolyfills

```ts
const browserPolyfills: (additions?: boolean) => void;
```

#### polyfills

```ts
const polyfills: (additions?: boolean) => void;
```

~{
  "element": "BottomNavigation",
  "props": {
    "previous": {
      "label": "AMQP: Start",
      "to": "/dev/amqp/start"
    },
    "next": {
      "label": "API: Use",
      "to": "/dev/api/use"
    }
  }
}~

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { toSortObject } from 'src/utils/funcs.util';

@Injectable()
export class SortQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    if (type === 'query') return this.transformQuery(value);

    return value;
  }

  transformQuery(query: any) {
    if (typeof query !== 'object' || !query) return query;

    const { sort } = query;

    if (sort && typeof sort === 'string') query.sort = toSortObject(sort);

    return query;
  }
}

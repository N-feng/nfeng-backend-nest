import { ApiPropertyOptional } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateGoodsAttrDto {
  @ApiPropertyOptional({ description: '商品ID' })
  goodsId?: string

  @ApiPropertyOptional({ description: '商品分类ID' })
  goodsCateId?: mongoose.Schema.Types.ObjectId
  @ApiPropertyOptional({ description: '商品类型属性ID' })
  attribute_cate_id?: string
  @ApiPropertyOptional({ description: '商品类型属性ID' })
  attributeId?: string
  @ApiPropertyOptional({ description: '商品类型属性类型' })
  attributeType?: string

  @ApiPropertyOptional({ description: '商品类型属性名称' })
  attributeTitle?: string
  @ApiPropertyOptional({ description: '商品类型属性值' })
  attributeValue?: string

  @ApiPropertyOptional({ description: '商品状态' })
  state?: number
  @ApiPropertyOptional({ description: '增加时间' })
  createAt?: number
}
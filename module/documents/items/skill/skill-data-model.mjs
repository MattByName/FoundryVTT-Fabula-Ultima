import { UseWeaponDataModel } from '../common/use-weapon-data-model.mjs';
import { ItemAttributesDataModel } from '../common/item-attributes-data-model.mjs';
import { DamageDataModel } from '../common/damage-data-model.mjs';
import { ImprovisedDamageDataModel } from '../common/improvised-damage-data-model.mjs';
import { ProgressDataModel } from '../common/progress-data-model.mjs';
import { FU } from '../../../helpers/config.mjs';
import { CheckHooks } from '../../../checks/check-hooks.mjs';

Hooks.on(CheckHooks.renderCheck, (sections, check, actor, item) => {
	if (item?.system instanceof SkillDataModel) {
		sections.push(
			item.createChatMessage(item, false).then((v) => {
				check.additionalRolls.push(...v.rolls);
				return { content: v.content };
			}),
		);
	}
});

/**
 * @property {string} subtype.value
 * @property {string} summary.value
 * @property {string} description
 * @property {boolean} isFavored.value
 * @property {boolean} showTitleCard.value
 * @property {number} level.value
 * @property {number} level.min
 * @property {number} level.max
 * @property {string} class.value
 * @property {UseWeaponDataModel} useWeapon
 * @property {ItemAttributesDataModel} attributes
 * @property {number} accuracy.value
 * @property {Defense} defense
 * @property {DamageDataModel} damage
 * @property {ImprovisedDamageDataModel} impdamage
 * @property {string} source.value
 * @property {UseWeaponDataModel} rollInfo.useWeapon
 * @property {ItemAttributesDataModel} rollInfo.attributes
 * @property {number} rollInfo.accuracy.value
 * @property {DamageDataModel} rollInfo.damage
 * @property {boolean} hasRoll.value
 */
export class SkillDataModel extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const { SchemaField, StringField, HTMLField, BooleanField, NumberField, EmbeddedDataField } = foundry.data.fields;
		return {
			fuid: new StringField(),
			subtype: new SchemaField({ value: new StringField() }),
			summary: new SchemaField({ value: new StringField() }),
			description: new HTMLField(),
			isFavored: new SchemaField({ value: new BooleanField() }),
			showTitleCard: new SchemaField({ value: new BooleanField() }),
			level: new SchemaField({
				value: new NumberField({ initial: 1, min: 0, integer: true, nullable: false }),
				max: new NumberField({ initial: 10, min: 1, integer: true, nullable: false }),
				min: new NumberField({ initial: 0, min: 0, integer: true, nullable: false }),
			}),
			class: new SchemaField({ value: new StringField() }),
			useWeapon: new EmbeddedDataField(UseWeaponDataModel, {}),
			attributes: new EmbeddedDataField(ItemAttributesDataModel, { initial: { primary: { value: 'ins' }, secondary: { value: 'mig' } } }),
			accuracy: new SchemaField({ value: new NumberField({ initial: 0, integer: true, nullable: false }) }),
			defense: new StringField({ initial: 'def', choices: Object.keys(FU.defenses) }),
			damage: new EmbeddedDataField(DamageDataModel, {}),
			impdamage: new EmbeddedDataField(ImprovisedDamageDataModel, {}),
			hasResource: new SchemaField({ value: new BooleanField() }),
			rp: new EmbeddedDataField(ProgressDataModel, {}),
			source: new SchemaField({ value: new StringField() }),
			rollInfo: new SchemaField({
				useWeapon: new EmbeddedDataField(UseWeaponDataModel, {}),
				attributes: new EmbeddedDataField(ItemAttributesDataModel, { initial: { primary: { value: 'ins' }, secondary: { value: 'mig' } } }),
				accuracy: new SchemaField({ value: new NumberField({ initial: 0, integer: true, nullable: false }) }),
				damage: new EmbeddedDataField(DamageDataModel, {}),
			}),
			hasRoll: new SchemaField({ value: new BooleanField() }),
		};
	}
}

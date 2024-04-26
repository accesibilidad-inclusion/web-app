<script setup lang="ts">
import QuestionInstruction from '@/components/QuestionInstruction.vue'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

const choice = ref<string>('')
const aidAsk = ref<string>('')
const aidAskSent = ref<boolean>(false)

function setChoice(value: string) {
	choice.value = value
}
async function submitAsk() {
	const response = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/extension_comments/store`)
		.post({
			url: new URLSearchParams(document.location.search)?.get('url') || '#',
			comment: aidAsk.value,
		}).json();
	if ( response ) {
		aidAsk.value = '';
		setChoice('');
		aidAskSent.value = true;
	}
}
</script>

<template>
	<main class="page page--no-help">
		<div class="page__inner">
			<QuestionInstruction text="¡Hola! Este sitio web no cuenta con apoyos de PICTOS" icon="sitio-web" />
			<p class="no-help__description">{{ $t('noHelpAvailable.wantToHelp') }}</p>
			<div class="no-help__choices">
				<button @click="setChoice('ask')" type="button"
					v-bind:class="{ 'btn btn--large': true, 'btn--active': choice === 'ask' }">
					{{ $t('noHelpAvailable.askAid') }}
				</button>
				<button @click="setChoice('evaluate')" type="button"
					v-bind:class="{ 'btn btn--large': true, 'btn--active': choice === 'evaluate' }">
					{{ $t('noHelpAvailable.evaluateSite') }}
				</button>
			</div>
			<div class="no-help__choice no-help__choice--empty" v-if="choice === ''"></div>
			<div v-if="choice === 'ask'" :class="{ 'no-help__choice no-help__choice--ask': true, 'no-help__choice--ask-sent': aidAskSent }">
				<textarea v-if="! aidAskSent" v-model="aidAsk" cols="30" rows="4"
					:placeholder="$t('noHelpAvailable.howToAsk')"></textarea>
				<div v-if="aidAskSent" class="no-help__choice-description">
					<p>
						{{ $t('noHelpAvailable.askSent') }}
					</p>
				</div>
				<button @click.prevent="submitAsk" type="button" :disabled="aidAskSent"
					class="btn btn--primary btn--large btn--block">
					{{ $t('noHelpAvailable.sendAsk') }}
				</button>
			</div>
			<div v-if="choice === 'evaluate'" class="no-help__choice no-help__choice--evaluate">
				<div class="no-help__choice-description" v-html="$t('noHelpAvailable.evaluationDescription')">
				</div>
				<button type="button" class="btn btn--primary btn--large btn--block" disabled>
					{{ $t('noHelpAvailable.startEvaluation') }}
				</button>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
.page--no-help {
	background: var(--color--yellow-light);
	min-height: 100dvh;

	.page__inner {
		background: var(--color--yellow);
		border-radius: var(--border-radius-lg);
		margin: calc(var(--spacer--400) * 3) var(--spacer--400) var(--spacer--400);
		min-height: calc(100dvh - (var(--spacer--400) * 4));
		padding: var(--spacer--600) var(--spacer--400) var(--spacer--600);
		display: flex;
		flex-flow: column;
	}

	.instruction {
		background: none;
		flex-grow: 0;
	}

	:deep(.instruction__icon) {
		background-color: var(--color--yellow-light);
	}

	:deep(.instruction__title) {
		font-size: var(--font-size--700);
		font-weight: 800;
	}

	.no-help__description {
		font-size: var(--font-size--600);
		margin: var(--spacer--400) 0 var(--spacer--500);
		text-align: center;
		font-weight: 700;
	}

	.no-help__choices {
		display: flex;
		gap: var(--spacer--400);

		button {
			flex-grow: 1;
			flex-basis: 100%;
			flex-shrink: 1;
			border: 1px solid var(--color--blue-dark);
			font-weight: 700;
			font-size: var(--font-size--500);
			color: var(--color--blue-dark);
			white-space: nowrap;
			border-radius: var(--border-radius-md);

			&.btn--active {
				background: var(--color--yellow-light);
			}
		}
	}

	.no-help__choice {
		display: flex;
		flex-grow: 1;
		flex-basis: 50%;
		flex-flow: column;
	}

	.no-help__choice--ask {
		justify-content: space-between;

		textarea {
			width: 100%;
			border: 1px solid var(--color--blue-dark);
			border-radius: var(--border-radius-md);
			font-family: inherit;
			padding: var(--spacer--400);
			margin: var(--spacer--400) 0;

			&::placeholder {
				color: var(--color--blue-dark);
				opacity: 0.7;
				font-weight: 600;
			}
		}
	}

	.no-help__choice--ask-sent {
		justify-content: flex-end;
	}

	.no-help__choice--evaluate {
		display: flex;
		flex-flow: column;
		justify-content: flex-end;
		flex-grow: 1;
	}

	.no-help__choice-description {
		margin: var(--spacer--500) 0;
		text-align: center;

		p {
			font-size: var(--font-size--500);
		}
	}
}
</style>

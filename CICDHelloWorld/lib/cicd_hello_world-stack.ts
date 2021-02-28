import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import * as cp from '@aws-cdk/aws-codepipeline';
import * as cpa from '@aws-cdk/aws-codepipeline-actions';
import * as pipelines from '@aws-cdk/pipelines';
import { WebServiceStage } from './hellowWorldDevStage';
import config from './config.json'

export class CicdHelloWorldStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const {repoTokenName, repoName, repoBranchName ,repoOwner, repoType} = config.repoProps
    const sourceArtifact = new cp.Artifact();
    const cloudAssemblyArtifact = new cp.Artifact();
    const sourceAction = new cpa.GitHubSourceAction({
        actionName: repoType,
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager(repoTokenName),
        owner: repoOwner,
        repo: repoName,
        branch:repoBranchName
    });

    const synthAction = pipelines.SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: 'npm install && npm run build && npm run test',
        synthCommand: 'npm run synth'
      });

    const pipeline = new pipelines.CdkPipeline(this, 'Pipeline', {
        cloudAssemblyArtifact,
        sourceAction,
        synthAction
    });
    // Dev stage
    const development = new WebServiceStage(this, 'Development');
    pipeline.addApplicationStage(development);

  }
}
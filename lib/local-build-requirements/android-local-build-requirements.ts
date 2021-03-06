export class AndroidLocalBuildRequirements {
	constructor(private androidToolsInfo: NativeScriptDoctor.IAndroidToolsInfo,
		private sysInfo: NativeScriptDoctor.ISysInfo) { }

	public async checkRequirements(projectDir?: string, runtimeVersion?: string): Promise<boolean> {
		const androidToolsInfo = await this.androidToolsInfo.validateInfo();
		const javacVersion =  await this.sysInfo.getJavaCompilerVersion();
		if (androidToolsInfo.length ||
			!javacVersion ||
			!await this.sysInfo.getAdbVersion() ||
			!await this.androidToolsInfo.validateJavacVersion(javacVersion, projectDir, runtimeVersion)) {
			return false;
		}

		return true;
	}
}


const fs = require('fs');
const path = require('path');

console.log('🌍 Compiling language files...');

// Read the reasons directory
const reasonsDir = path.join(__dirname, '../reasons');

try {
    // Get all JSON files in the directory (excluding combined.json)
    const files = fs.readdirSync(reasonsDir)
        .filter(file => file.endsWith('.json') && file !== 'combined.json');

    if (files.length === 0) {
        console.error('❌ No language files found!');
        process.exit(1);
    }

    // Initialize result object and stats
    const result = {};
    let totalReasons = 0;

    // Process each file
    files.forEach(file => {
        try {
            const lang = path.parse(file).name;
            const filePath = path.join(reasonsDir, file);
            
            // Read and parse the file
            const content = fs.readFileSync(filePath, 'utf8');
            const reasons = JSON.parse(content);
            
            // Validate array structure
            if (!Array.isArray(reasons)) {
                throw new Error(`${file} should contain an array of reasons`);
            }
            
            if (reasons.length === 0) {
                console.warn(`⚠️  Warning: ${file} is empty`);
            }
            
            result[lang] = reasons;
            totalReasons += reasons.length;
            console.log(`✅ ${lang}: ${reasons.length} reasons`);
            
        } catch (error) {
            console.error(`❌ Error processing ${file}: ${error.message}`);
            process.exit(1);
        }
    });

    // Add metadata to the result
    const output = {
        _metadata: {
            compiledAt: new Date().toISOString(),
            languages: Object.keys(result).length,
            totalReasons: totalReasons,
            version: '1.0.0'
        },
        ...result
    };

    // Write the combined result
    const outputPath = path.join(reasonsDir, 'combined.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    
    console.log('\n🎉 Compilation completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   • Languages: ${Object.keys(result).length}`);
    console.log(`   • Total reasons: ${totalReasons}`);
    console.log(`   • Output: reasons/combined.json`);
    
} catch (error) {
    console.error('\n❌ Compilation failed:', error.message);
    process.exit(1);
}
